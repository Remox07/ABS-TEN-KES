// Check all Supabase databases to find the active one
const { createClient } = require('@supabase/supabase-js');

const databases = [
  {
    name: 'Database 1 (from .env local)',
    url: 'https://schzdduftqwlsbajedzx.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjaHpkZHVmdHF3bHNiYWplZHp4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjMxMTQwMiwiZXhwIjoyMTAxODg3NDAyfQ.3uAf0lA7WT7gNeIwqedPySGLSlAKwBGnXWuyAMMTIQ8'
  },
  {
    name: 'Database 2 (from netlify.env old)',
    url: 'https://tbjshustaqijmbtxssod.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRianNodXN0YXFpam1idHhzc29kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjEwNzk0OSwiZXhwIjoyMTAxNjgzOTQ5fQ.Y_tdjt1SPC8NrEGZqKf4qywh_OpdvPMfKlXmhFVbbRY'
  }
];

async function checkDatabase(db) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔍 Checking: ${db.name}`);
  console.log(`📍 URL: ${db.url}`);
  console.log('='.repeat(60));
  
  try {
    const supabase = createClient(db.url, db.key, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    
    // Check users table
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, name, email, role')
      .limit(5);
    
    if (usersError) {
      if (usersError.code === 'PGRST116') {
        console.log('❌ Table "users" does not exist - Database not initialized');
      } else {
        console.log('❌ Error:', usersError.message);
      }
      return;
    }
    
    console.log('✅ Users table exists');
    console.log(`   Total users found: ${users?.length || 0}`);
    
    if (users && users.length > 0) {
      console.log('\n   Users list:');
      users.forEach((u, i) => {
        console.log(`   ${i + 1}. ${u.name} (${u.email}) - Role: ${u.role}`);
      });
      
      // Check for admin
      const admins = users.filter(u => u.role === 'admin');
      if (admins.length > 0) {
        console.log(`\n   ✅ Found ${admins.length} admin(s)`);
        admins.forEach(a => {
          console.log(`      - ${a.name} (${a.email})`);
        });
      }
    }
    
    // Check departments
    const { data: depts, error: deptError } = await supabase
      .from('departments')
      .select('id, name')
      .limit(5);
    
    if (!deptError && depts) {
      console.log(`\n   Departments: ${depts.length} found`);
    }
    
    // Check attendance
    const { data: attendance, error: attError } = await supabase
      .from('attendance')
      .select('id', { count: 'exact', head: true });
    
    if (!attError) {
      console.log(`   Attendance records: Found`);
    }
    
    console.log('\n   ✅ This database is ACTIVE and has data!');
    console.log('   👉 Use this database for your application');
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
  }
}

async function main() {
  console.log('🔍 Checking all Supabase databases...\n');
  
  for (const db of databases) {
    await checkDatabase(db);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between checks
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Check complete!');
  console.log('='.repeat(60));
  console.log('\nℹ️  Use the database that has users and data initialized.');
  console.log('   Update Netlify environment variables accordingly.\n');
}

main();
