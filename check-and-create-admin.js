// Script to check and create admin user in Supabase
const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');

// IMPORTANT: Use the CORRECT and ACTIVE Supabase project
const SUPABASE_URL = 'https://schzdduftqwlsbajedzx.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjaHpkZHVmdHF3bHNiYWplZHp4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjMxMTQwMiwiZXhwIjoyMTAxODg3NDAyfQ.3uAf0lA7WT7gNeIwqedPySGLSlAKwBGnXWuyAMMTIQ8';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkAndCreateAdmin() {
  try {
    console.log('🔍 Checking database connection...');
    console.log('URL:', SUPABASE_URL);
    
    // Check if users table exists
    console.log('\n📋 Checking users table...');
    const { data: tables, error: tableError } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true });
    
    if (tableError) {
      console.error('❌ Error accessing users table:', tableError.message);
      console.error('💡 Make sure you have run the SQL schema in Supabase SQL Editor first!');
      process.exit(1);
    }
    
    console.log('✅ Users table exists');
    
    // Check for existing admin
    console.log('\n🔍 Checking for existing admin...');
    const { data: existingAdmins, error: checkError } = await supabase
      .from('users')
      .select('id, email, name, role')
      .eq('role', 'admin');
    
    if (checkError) {
      throw new Error(`Error checking admin: ${checkError.message}`);
    }
    
    if (existingAdmins && existingAdmins.length > 0) {
      console.log('✅ Admin users found:');
      existingAdmins.forEach((admin, index) => {
        console.log(`   ${index + 1}. ${admin.name} (${admin.email})`);
      });
      
      // Check if our specific admin exists
      const ourAdmin = existingAdmins.find(a => a.email === 'armyteguh00@gmail.com');
      if (ourAdmin) {
        console.log('\n✅ Target admin (armyteguh00@gmail.com) already exists!');
        console.log('   You can login with:');
        console.log('   Email: armyteguh00@gmail.com');
        console.log('   Password: Admin123!');
      } else {
        console.log('\n⚠️  Admin exists but not with email armyteguh00@gmail.com');
        console.log('   Creating new admin...');
        await createAdmin();
      }
    } else {
      console.log('❌ No admin found. Creating admin user...');
      await createAdmin();
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check your Supabase credentials');
    console.error('   2. Make sure tables are created (run supabase-schema.sql)');
    console.error('   3. Check Supabase dashboard for any errors');
    process.exit(1);
  }
}

async function createAdmin() {
  try {
    const adminEmail = 'armyteguh00@gmail.com';
    const adminPassword = 'Admin123!';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    // Get or create department
    let { data: dept } = await supabase
      .from('departments')
      .select('id')
      .eq('name', 'Administrasi')
      .single();
    
    if (!dept) {
      console.log('   Creating Administrasi department...');
      const { data: newDept, error: deptError } = await supabase
        .from('departments')
        .insert([{ name: 'Administrasi', description: 'Bagian Administrasi' }])
        .select()
        .single();
      
      if (deptError) throw deptError;
      dept = newDept;
    }
    
    // Get or create position
    let { data: pos } = await supabase
      .from('positions')
      .select('id')
      .eq('name', 'Administrator')
      .single();
    
    if (!pos) {
      console.log('   Creating Administrator position...');
      const { data: newPos, error: posError } = await supabase
        .from('positions')
        .insert([{ name: 'Administrator', description: 'Pengelola Sistem' }])
        .select()
        .single();
      
      if (posError) throw posError;
      pos = newPos;
    }
    
    // Create admin user
    console.log('   Creating admin user...');
    const { data: admin, error: adminError } = await supabase
      .from('users')
      .insert([
        {
          nip: 'ADMIN001',
          name: 'Administrator',
          email: adminEmail,
          password: hashedPassword,
          phone: '08123456789',
          department_id: dept.id,
          position_id: pos.id,
          role: 'admin',
          status: 'active',
          address: 'Kantor Kesehatan'
        }
      ])
      .select()
      .single();
    
    if (adminError) {
      throw new Error(`Error creating admin: ${adminError.message}`);
    }
    
    console.log('\n✅ Admin user created successfully!');
    console.log('═'.repeat(50));
    console.log('👤 Admin Credentials:');
    console.log(`   Email   : ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('═'.repeat(50));
  } catch (error) {
    throw error;
  }
}

// Run the check
checkAndCreateAdmin();
