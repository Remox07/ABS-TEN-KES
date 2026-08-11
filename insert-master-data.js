const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function insertMasterData() {
  console.log('🚀 Inserting master data...\n');

  try {
    // 1. Insert Departments
    console.log('📁 Inserting Departments...');
    const departments = [
      { name: 'Poli Umum', description: 'Pelayanan kesehatan umum' },
      { name: 'Poli Gigi', description: 'Pelayanan kesehatan gigi dan mulut' },
      { name: 'Poli KIA (Kesehatan Ibu dan Anak)', description: 'Pelayanan ibu hamil, bayi, dan balita' },
      { name: 'Laboratorium', description: 'Pemeriksaan laboratorium' },
      { name: 'Farmasi/Apotek', description: 'Pelayanan obat-obatan' },
      { name: 'Administrasi/Loket', description: 'Pelayanan administrasi dan pendaftaran' },
      { name: 'UGD (Unit Gawat Darurat)', description: 'Pelayanan gawat darurat' },
      { name: 'Rawat Inap', description: 'Pelayanan rawat inap pasien' },
      { name: 'Promosi Kesehatan', description: 'Edukasi dan promosi kesehatan masyarakat' },
      { name: 'Sanitasi', description: 'Kebersihan dan sanitasi lingkungan' }
    ];

    const { data: deptData, error: deptError } = await supabase
      .from('departments')
      .insert(departments)
      .select();

    if (deptError) {
      console.error('❌ Error inserting departments:', deptError.message);
      return;
    }

    console.log(`✅ ${deptData.length} departments inserted!`);
    console.log('Departments:', deptData.map(d => d.name).join(', '));
    console.log('');

    // 2. Insert Positions (Jabatan)
    console.log('👤 Inserting Positions/Jabatan...');
    const positions = [
      // Tenaga Medis
      { name: 'Dokter Umum', category: 'Medis' },
      { name: 'Dokter Gigi', category: 'Medis' },
      { name: 'Bidan', category: 'Medis' },
      { name: 'Perawat', category: 'Medis' },
      { name: 'Perawat Gigi', category: 'Medis' },
      
      // Tenaga Kesehatan Lain
      { name: 'Analis Laboratorium', category: 'Kesehatan' },
      { name: 'Apoteker', category: 'Kesehatan' },
      { name: 'Asisten Apoteker', category: 'Kesehatan' },
      { name: 'Ahli Gizi', category: 'Kesehatan' },
      { name: 'Sanitarian', category: 'Kesehatan' },
      
      // Administrasi
      { name: 'Kepala Puskesmas', category: 'Administrasi' },
      { name: 'Kepala Tata Usaha', category: 'Administrasi' },
      { name: 'Staf Administrasi', category: 'Administrasi' },
      { name: 'Petugas Pendaftaran', category: 'Administrasi' },
      
      // Support
      { name: 'Petugas Kebersihan', category: 'Support' },
      { name: 'Satpam', category: 'Support' },
      { name: 'Supir Ambulans', category: 'Support' }
    ];

    // Check if positions table exists, if not use a generic insert
    const { data: posData, error: posError } = await supabase
      .from('positions')
      .insert(positions)
      .select();

    if (posError) {
      // If positions table doesn't exist, we'll just log the data
      console.log('⚠️  Positions table might not exist yet.');
      console.log('📝 Create positions table in Supabase with:');
      console.log(`
CREATE TABLE IF NOT EXISTS positions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
      `);
      console.log('Then run this script again.');
      return;
    }

    console.log(`✅ ${posData.length} positions inserted!`);
    console.log('Positions:', posData.map(p => p.name).join(', '));
    console.log('');

    console.log('🎉 Master data inserted successfully!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   Departments: ${deptData.length}`);
    console.log(`   Positions:   ${posData.length}`);
    console.log('');
    console.log('✅ Refresh your registration page to see the dropdowns filled!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
insertMasterData();
