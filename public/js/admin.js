// Admin dashboard logic

// Helper function to format date for input/API
function formatDateForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper function to get status badge class
function getStatusBadgeClass(status) {
  const statusMap = {
    'hadir': 'badge-success',
    'present': 'badge-success',
    'terlambat': 'badge-warning',
    'late': 'badge-warning',
    'alpha': 'badge-danger',
    'absent': 'badge-danger',
    'izin': 'badge-info',
    'leave': 'badge-info',
    'approved': 'badge-success',
    'rejected': 'badge-danger',
    'pending': 'badge-warning',
    'active': 'badge-success',
    'inactive': 'badge-danger'
  };
  return statusMap[String(status).toLowerCase()] || 'badge-secondary';
}

// Helper function to get status text
function getStatusText(status) {
  const statusMap = {
    'hadir': 'Hadir',
    'present': 'Hadir',
    'terlambat': 'Terlambat',
    'late': 'Terlambat',
    'alpha': 'Tidak Hadir',
    'absent': 'Tidak Hadir',
    'izin': 'Izin',
    'leave': 'Izin',
    'approved': 'Disetujui',
    'rejected': 'Ditolak',
    'pending': 'Menunggu',
    'active': 'Aktif',
    'inactive': 'Nonaktif'
  };
  return statusMap[String(status).toLowerCase()] || status;
}

document.addEventListener('DOMContentLoaded', () => {
  requireAdmin();
  initAdminDashboard();
});

function initAdminDashboard() {
  const user = getUserData();
  document.getElementById('userName').textContent = user.name;

  updateAdminClock();
  setInterval(updateAdminClock, 1000);
  
  // Setup navigation
  setupAdminNavigation();
  
  // Setup logout
  document.getElementById('logoutBtn').addEventListener('click', logout);
  
  // Load dropdown options for user form
  loadDepartmentsAndPositions();
  
  // Setup modals
  setupModals();
  
  // Setup filters
  setupFilters();
  
  // Restore last active page from localStorage
  restoreLastActivePage();
}

function restoreLastActivePage() {
  const lastPage = localStorage.getItem('activeAdminPage') || 'dashboardAdmin';
  
  // Find the link with matching data-page
  const menuLink = document.querySelector(`.navbar-menu-link[data-page="${lastPage}"]`);
  
  if (menuLink) {
    // Trigger the click to load the page
    showContentSection(lastPage);
    
    // Update active menu
    document.querySelectorAll('.navbar-menu-link').forEach(a => a.classList.remove('active'));
    menuLink.classList.add('active');
    
    // Load data for the specific page
    if (lastPage === 'allAttendance') {
      loadAllAttendance();
    } else if (lastPage === 'manageUsers') {
      loadUsers();
    } else if (lastPage === 'manageLeaves') {
      loadAllLeaves();
    } else if (lastPage === 'reports') {
      setupReports();
    } else if (lastPage === 'dashboardAdmin') {
      loadAdminDashboard();
    }
  } else {
    // Default to dashboard if page not found
    loadAdminDashboard();
  }
}

function updateAdminClock() {
  const now = new Date();
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const timeText = [
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0')
  ].join(':');

  const dateText = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  const clockEl = document.getElementById('adminClock');
  const dateEl = document.getElementById('adminDate');

  if (clockEl) clockEl.textContent = timeText;
  if (dateEl) dateEl.textContent = dateText;
}

// Setup navigation
function setupAdminNavigation() {
  document.querySelectorAll('.navbar-menu-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const page = link.getAttribute('data-page');

      if (page === 'rfidFace') {
        e.preventDefault();
        document.querySelectorAll('.navbar-menu-link').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
        localStorage.setItem('activeAdminPage', 'rfidFace');
        window.location.href = 'rfid-face-register.html';
        return;
      }

      e.preventDefault();
      showContentSection(page);
      
      // Update active menu
      document.querySelectorAll('.navbar-menu-link').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
      
      // Save active page to localStorage
      localStorage.setItem('activeAdminPage', page);
      
      // Load data for specific pages
      if (page === 'allAttendance') {
        loadAllAttendance();
      } else if (page === 'manageUsers') {
        loadUsers();
      } else if (page === 'manageLeaves') {
        loadAllLeaves();
      } else if (page === 'reports') {
        setupReports();
      }
    });
  });
}

// Show content section
function showContentSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.add('active');
  } else {
    // Fallback to dashboard if section not found
    document.getElementById('dashboardAdmin').classList.add('active');
  }
}

// Load admin dashboard
async function loadAdminDashboard() {
  try {
    const today = formatDateForInput(new Date());
    
    // Load stats
    const statsData = await apiCall(API_ENDPOINTS.ATTENDANCE_STATS);
    updateAdminStats(statsData.data);
    
    // Load recent attendance
    const attendanceData = await apiCall(`${API_ENDPOINTS.ALL_ATTENDANCE}?date=${today}&limit=10`);
    updateRecentAttendance(attendanceData.data);
  } catch (error) {
    console.error('Error loading admin dashboard:', error);
  }
}

// Update admin stats
function updateAdminStats(data) {
  document.getElementById('totalUsers').textContent = data.totalUsers || 0;
  
  const stats = data.stats || [];
  const hadir = stats.find(s => s.status === 'hadir')?.count || 0;
  const telat = 0; // Can be calculated based on time
  const absent = data.totalUsers - hadir;
  
  document.getElementById('todayPresent').textContent = hadir;
  document.getElementById('todayLate').textContent = telat;
  document.getElementById('todayAbsent').textContent = absent;
}

// Update recent attendance
function updateRecentAttendance(data) {
  const tbody = document.getElementById('recentAttendance');
  
  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">Tidak ada data</td></tr>';
    return;
  }
  
  tbody.innerHTML = data.map(item => `
    <tr>
      <td>${item.nip}</td>
      <td>${item.name}</td>
      <td>${item.department_name || '-'}</td>
      <td>${formatTime(item.check_in)}</td>
      <td>${formatTime(item.check_out)}</td>
      <td><span class="badge ${getStatusBadgeClass(item.status)}">${getStatusText(item.status)}</span></td>
    </tr>
  `).join('');
}

// Load all attendance
async function loadAllAttendance(filters = {}) {
  try {
    let url = API_ENDPOINTS.ALL_ATTENDANCE;
    const params = new URLSearchParams();
    
    if (filters.date) params.append('date', filters.date);
    if (filters.department_id) params.append('department_id', filters.department_id);
    
    if (params.toString()) {
      url += '?' + params.toString();
    }
    
    const data = await apiCall(url);
    const tbody = document.getElementById('allAttendanceTable');
    
    if (data.data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center">Tidak ada data</td></tr>';
      return;
    }
    
    tbody.innerHTML = data.data.map(item => `
      <tr>
        <td>${formatDate(item.date)}</td>
        <td>${item.nip}</td>
        <td>${item.name}</td>
        <td>${item.department_name || '-'}</td>
        <td>${formatTime(item.check_in)}</td>
        <td>${formatTime(item.check_out)}</td>
        <td><span class="badge ${getStatusBadgeClass(item.status)}">${getStatusText(item.status)}</span></td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading attendance:', error);
  }
}

// Load users
async function loadUsers() {
  try {
    const data = await apiCall(`${API_ENDPOINTS.USERS}?limit=100`);
    const tbody = document.getElementById('usersTable');
    
    if (data.data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center">Tidak ada data</td></tr>';
      return;
    }
    
    tbody.innerHTML = data.data.map(item => `
      <tr>
        <td>${item.nip}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.department_name || '-'}</td>
        <td>${item.position_name || '-'}</td>
        <td><span class="badge ${getStatusBadgeClass(item.status)}">${getStatusText(item.status)}</span></td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="editUser(${item.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteUser(${item.id})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
    
    // Load departments and positions for form
    await loadDepartmentsAndPositions();
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

const DEFAULT_DEPARTMENTS = [
  { id: 1, name: 'Poli Umum' },
  { id: 2, name: 'Poli Gigi' },
  { id: 3, name: 'UGD' },
  { id: 4, name: 'Farmasi' },
  { id: 5, name: 'Laboratorium' },
  { id: 6, name: 'Administrasi' }
];

const DEFAULT_POSITIONS = [
  { id: 1, name: 'Dokter Umum' },
  { id: 2, name: 'Dokter Gigi' },
  { id: 3, name: 'Perawat' },
  { id: 4, name: 'Bidan' },
  { id: 5, name: 'Apoteker' },
  { id: 6, name: 'Analis Kesehatan' },
  { id: 7, name: 'Staff Administrasi' }
];

function populateSelectOptions(select, items, placeholder, currentValue = '') {
  if (!select) return;

  const options = (items || []).map(item => `<option value="${item.id}">${item.name}</option>`).join('');
  select.innerHTML = `<option value="">${placeholder}</option>${options}`;

  if (currentValue !== undefined && currentValue !== null && currentValue !== '') {
    const hasValue = Array.from(select.options).some(option => option.value === String(currentValue));
    select.value = hasValue ? String(currentValue) : '';
  } else {
    select.value = '';
  }
}

// Load departments and positions
async function loadDepartmentsAndPositions() {
  try {
    const [deptResult, posResult] = await Promise.allSettled([
      apiCall(API_ENDPOINTS.DEPARTMENTS),
      apiCall(API_ENDPOINTS.POSITIONS)
    ]);

    const departments = deptResult.status === 'fulfilled' && Array.isArray(deptResult.value?.data) && deptResult.value.data.length > 0
      ? deptResult.value.data
      : DEFAULT_DEPARTMENTS;

    const positions = posResult.status === 'fulfilled' && Array.isArray(posResult.value?.data) && posResult.value.data.length > 0
      ? posResult.value.data
      : DEFAULT_POSITIONS;

    const deptSelects = [
      { select: document.getElementById('userDepartment'), placeholder: 'Pilih Departemen' },
      { select: document.getElementById('filterDepartment'), placeholder: 'Semua Departemen' }
    ];

    deptSelects.forEach(({ select, placeholder }) => {
      if (select) {
        const currentValue = select.value;
        populateSelectOptions(select, departments, placeholder, currentValue);
      }
    });

    const posSelect = document.getElementById('userPosition');
    if (posSelect) {
      const currentValue = posSelect.value;
      populateSelectOptions(posSelect, positions, 'Pilih Jabatan', currentValue);
    }
  } catch (error) {
    console.error('Error loading departments/positions:', error);
    populateSelectOptions(document.getElementById('userDepartment'), DEFAULT_DEPARTMENTS, 'Pilih Departemen');
    populateSelectOptions(document.getElementById('filterDepartment'), DEFAULT_DEPARTMENTS, 'Semua Departemen');
    populateSelectOptions(document.getElementById('userPosition'), DEFAULT_POSITIONS, 'Pilih Jabatan');
  }
}

// Setup modals
function setupModals() {
  const userModal = document.getElementById('userModal');
  const btnAddUser = document.getElementById('btnAddUser');
  const userForm = document.getElementById('userForm');
  
  // Add user button
  btnAddUser.addEventListener('click', async () => {
    document.getElementById('userModalTitle').textContent = 'Tambah Pegawai';
    userForm.reset();
    document.getElementById('userId').value = '';
    document.getElementById('userPassword').required = true;
    populateSelectOptions(document.getElementById('userDepartment'), DEFAULT_DEPARTMENTS, 'Pilih Departemen');
    populateSelectOptions(document.getElementById('userPosition'), DEFAULT_POSITIONS, 'Pilih Jabatan');
    await loadDepartmentsAndPositions();
    userModal.classList.add('show');
  });
  
  // Close modal
  document.querySelectorAll('.close, .close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      userModal.classList.remove('show');
    });
  });
  
  // Submit form
  userForm.addEventListener('submit', handleUserSubmit);
}

// Handle user submit
async function handleUserSubmit(e) {
  e.preventDefault();
  
  const userId = document.getElementById('userId').value;
  const formData = {
    nip: document.getElementById('userNip').value,
    name: document.getElementById('userNama').value,
    email: document.getElementById('userEmail').value,
    phone: document.getElementById('userPhone').value,
    address: document.getElementById('userAddress').value,
    department_id: document.getElementById('userDepartment').value,
    position_id: document.getElementById('userPosition').value,
    role: document.getElementById('userRole').value,
    status: document.getElementById('userStatus').value
  };
  
  const password = document.getElementById('userPassword').value;
  if (password) {
    formData.password = password;
  }
  
  try {
    if (userId) {
      // Update
      await apiCall(API_ENDPOINTS.USER_DETAIL(userId), 'PUT', formData);
      showNotification('User berhasil diperbarui!', 'success');
    } else {
      // Create
      await apiCall(API_ENDPOINTS.USERS, 'POST', formData);
      showNotification('User berhasil ditambahkan!', 'success');
    }
    
    document.getElementById('userModal').classList.remove('show');
    loadUsers();
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

// Edit user
async function editUser(id) {
  try {
    populateSelectOptions(document.getElementById('userDepartment'), DEFAULT_DEPARTMENTS, 'Pilih Departemen');
    populateSelectOptions(document.getElementById('userPosition'), DEFAULT_POSITIONS, 'Pilih Jabatan');
    await loadDepartmentsAndPositions();
    const data = await apiCall(API_ENDPOINTS.USER_DETAIL(id));
    const user = data.data;
    
    document.getElementById('userModalTitle').textContent = 'Edit Pegawai';
    document.getElementById('userId').value = user.id;
    document.getElementById('userNip').value = user.nip;
    document.getElementById('userNama').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userPhone').value = user.phone || '';
    document.getElementById('userAddress').value = user.address || '';
    populateSelectOptions(document.getElementById('userDepartment'), DEFAULT_DEPARTMENTS, 'Pilih Departemen', user.department_id || '');
    populateSelectOptions(document.getElementById('userPosition'), DEFAULT_POSITIONS, 'Pilih Jabatan', user.position_id || '');
    await loadDepartmentsAndPositions();
    populateSelectOptions(document.getElementById('userDepartment'), DEFAULT_DEPARTMENTS, 'Pilih Departemen', user.department_id || '');
    populateSelectOptions(document.getElementById('userPosition'), DEFAULT_POSITIONS, 'Pilih Jabatan', user.position_id || '');
    document.getElementById('userRole').value = user.role;
    document.getElementById('userStatus').value = user.status;
    document.getElementById('userPassword').required = false;
    
    document.getElementById('userModal').classList.add('show');
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

// Delete user
async function deleteUser(id) {
  if (!confirm('Apakah Anda yakin ingin menghapus user ini?')) return;
  
  try {
    await apiCall(API_ENDPOINTS.USER_DETAIL(id), 'DELETE');
    showNotification('User berhasil dihapus!', 'success');
    loadUsers();
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

// Load all leaves
async function loadAllLeaves() {
  try {
    const data = await apiCall(API_ENDPOINTS.ALL_LEAVES);
    const container = document.getElementById('leavesTable');
    
    if (data.data.length === 0) {
      container.innerHTML = '<p class="text-center">Tidak ada pengajuan izin</p>';
      return;
    }
    
    container.innerHTML = data.data.map(item => `
      <div class="leave-card">
        <div class="leave-card-header">
          <div>
            <strong>${item.name}</strong> (${item.nip})
            <br><small>${item.department_name || '-'}</small>
          </div>
          <span class="badge ${getStatusBadgeClass(item.status)}">${getStatusText(item.status)}</span>
        </div>
        <div class="leave-card-body">
          <p><strong>Jenis:</strong> ${getStatusText(item.leave_type)}</p>
          <p><strong>Periode:</strong> ${formatDate(item.start_date)} - ${formatDate(item.end_date)}</p>
          <p><strong>Alasan:</strong> ${item.reason}</p>
          ${item.status === 'pending' ? `
            <div style="margin-top: 10px;">
              <button class="btn btn-sm btn-success" onclick="processLeave(${item.id}, 'approved')">
                <i class="fas fa-check"></i> Setujui
              </button>
              <button class="btn btn-sm btn-danger" onclick="processLeave(${item.id}, 'rejected')">
                <i class="fas fa-times"></i> Tolak
              </button>
            </div>
          ` : ''}
          ${item.notes ? `<p style="margin-top: 10px;"><strong>Catatan:</strong> ${item.notes}</p>` : ''}
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading leaves:', error);
  }
}

// Process leave
async function processLeave(id, status) {
  const notes = status === 'rejected' ? prompt('Catatan (opsional):') : '';
  
  try {
    await apiCall(API_ENDPOINTS.PROCESS_LEAVE(id), 'PUT', { status, notes });
    showNotification(`Pengajuan berhasil di${status === 'approved' ? 'setujui' : 'tolak'}!`, 'success');
    loadAllLeaves();
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

// Setup filters
function setupFilters() {
  const btnFilter = document.getElementById('btnFilterAttendance');
  if (btnFilter) {
    btnFilter.addEventListener('click', () => {
      const filters = {
        date: document.getElementById('filterDate').value,
        department_id: document.getElementById('filterDepartment').value
      };
      loadAllAttendance(filters);
    });
  }
}

// Setup reports
function setupReports() {
  // Populate month select
  const monthSelect = document.getElementById('reportMonth');
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  monthSelect.innerHTML = months.map((m, i) => `<option value="${i + 1}">${m}</option>`).join('');
  monthSelect.value = new Date().getMonth() + 1;
  
  // Populate year select
  const yearSelect = document.getElementById('reportYear');
  const currentYear = new Date().getFullYear();
  yearSelect.innerHTML = Array.from({length: 5}, (_, i) => currentYear - i)
    .map(y => `<option value="${y}">${y}</option>`).join('');
  
  // Generate button
  document.getElementById('btnGenerateReport').addEventListener('click', generateReport);
}

// Generate report
async function generateReport() {
  const month = document.getElementById('reportMonth').value;
  const year = document.getElementById('reportYear').value;
  
  try {
    const data = await apiCall(`${API_ENDPOINTS.ATTENDANCE_STATS}?month=${month}&year=${year}`);
    const container = document.getElementById('reportContent');
    
    const stats = data.data.stats || [];
    const total = stats.reduce((sum, s) => sum + s.count, 0);
    const maxCount = Math.max(...stats.map(s => Number(s.count) || 0), 1);

    const chartBars = stats.map(s => {
      const status = s.status || 'hadir';
      const value = Number(s.count) || 0;
      const percent = Math.max((value / maxCount) * 100, 12);
      const className = status === 'hadir' ? 'hadir' : status === 'alpha' ? 'alpha' : status === 'telat' ? 'telat' : 'izin';
      const icon = status === 'hadir' ? 'check' : status === 'alpha' ? 'times' : status === 'telat' ? 'clock' : 'file-alt';
      return `
        <div class="chart-column">
          <div class="chart-value">${value}</div>
          <div class="chart-bar-wrap">
            <div class="chart-bar ${className}" style="--bar-height: ${percent}%" title="${getStatusText(status)}: ${value}">
            </div>
          </div>
          <div class="chart-label"><i class="fas fa-${icon}"></i> ${getStatusText(status)}</div>
        </div>
      `;
    }).join('');
    
    container.innerHTML = `
      <div class="report-panel">
        <div class="report-header">
          <h4>Laporan Bulan ${month}/${year}</h4>
          <div class="report-summary">
            <i class="fas fa-chart-column"></i>
            Total: ${total}
          </div>
        </div>
        <div class="report-chart">
          ${chartBars}
        </div>
      </div>
      <div class="stats-grid mt-3">
        ${stats.map(s => `
          <div class="stat-card">
            <div class="stat-icon bg-${s.status === 'hadir' ? 'success' : s.status === 'alpha' ? 'danger' : s.status === 'telat' ? 'warning' : 'info'}">
              <i class="fas fa-${s.status === 'hadir' ? 'check' : s.status === 'alpha' ? 'times' : s.status === 'telat' ? 'clock' : 'file-alt'}"></i>
            </div>
            <div class="stat-info">
              <h3>${s.count}</h3>
              <p>${getStatusText(s.status)}</p>
            </div>
          </div>
        `).join('')}
        <div class="stat-card">
          <div class="stat-icon bg-primary">
            <i class="fas fa-list"></i>
          </div>
          <div class="stat-info">
            <h3>${total}</h3>
            <p>Total</p>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error generating report:', error);
  }
}
