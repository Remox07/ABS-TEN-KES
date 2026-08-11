// Simple test to check Supabase connection
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://tbjshustaqijmbtxssod.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRianNodXN0YXFpam1idHhzc29kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjEwNzk0OSwiZXhwIjoyMTAxNjgzOTQ5fQ.Y_tdjt1SPC8NrEGZqKf4qywh_OpdvPMfKlXmhFVbbRY';

console.log('Testing Supabase connection...');
console.log('URL:', SUPABASE_URL);

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testConnection() {
  try {
    // Test 1: Check connection by listing tables
    console.log('\n1. Testing basic connection...');
    const { data: tables, error: tableError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error('❌ Error:', tableError.message);
      console.error('Code:', tableError.code);
      console.error('Details:', tableError.details);
      
      if (tableError.code === 'PGRST116' || tableError.message.includes('does not exist')) {
        console.log('\n💡 Table "users" does not exist!');
        console.log('   You need to run the SQL schema first:');
        console.log('   1. Go to: https://supabase.com/dashboard/project/tbjshustaqijmbtxssod/sql');
        console.log('   2. Open supabase-schema.sql file');
        console.log('   3. Copy and paste the SQL');
        console.log('   4. Click "Run"');
      }
      return;
    }
    
    console.log('✅ Connection successful!');
    console.log('   Users found:', tables ? tables.length : 0);
    
    if (tables && tables.length > 0) {
      console.log('\n   First user:');
      console.log('   - Name:', tables[0].name);
      console.log('   - Email:', tables[0].email);
      console.log('   - Role:', tables[0].role);
    }
    
    // Test 2: Check departments
    console.log('\n2. Checking departments...');
    const { data: depts, error: deptError } = await supabase
      .from('departments')
      .select('*');
    
    if (deptError) {
      console.error('❌ Departments error:', deptError.message);
    } else {
      console.log('✅ Departments found:', depts?.length || 0);
      if (depts && depts.length > 0) {
        depts.forEach(d => console.log(`   - ${d.name}`));
      }
    }
    
    // Test 3: Check positions
    console.log('\n3. Checking positions...');
    const { data: positions, error: posError } = await supabase
      .from('positions')
      .select('*');
    
    if (posError) {
      console.error('❌ Positions error:', posError.message);
    } else {
      console.log('✅ Positions found:', positions?.length || 0);
      if (positions && positions.length > 0) {
        positions.forEach(p => console.log(`   - ${p.name}`));
      }
    }
    
  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testConnection();
