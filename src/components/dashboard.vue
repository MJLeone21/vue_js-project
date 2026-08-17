<script setup>

</script>

<template>
    <main>
        <header>
    <div class="header-container">
      <h1 class="logo">Oyera<br /><span>Auto</span></h1>
    </div>
  </header>

  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="Home.html">Home</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="adminDashboard.html">Dashboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Booking.html">Booking</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Technicians.html">Technicians</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Inventory.html">Inventory</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              More
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="Settings.html">Settings</a></li>
              <li><a class="dropdown-item" href="Help.html">Help</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="Logout.html">Logout</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>

  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-1">Admin Dashboard</h2>
        <p class="text-muted mb-0">Oyera Auto Service Bay</p>
        <p class="text-muted mb-0">Overview of users, technicians, and inventory</p>
      </div>
    </div>

    <!-- Stats Cards with Emojis -->
    <div class="row g-3 mb-4">
      <div class="col-md-3">
        <div class="card stat-card p-3 text-center">
          <div class="text-muted small">👥 Total Users</div>
          <h3>0</h3>
          <small class="text-muted">Active Users: 0</small>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card p-3 text-center">
          <div class="text-muted small">🧑‍🔧 Technicians</div>
          <h3>0</h3>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card p-3 text-center">
          <div class="text-muted small">📦 Inventory</div>
          <h3>0</h3>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card p-3 text-center">
          <div class="text-muted small">💰 Total Revenue</div>
          <h3>0</h3>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card p-3 mb-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">Recent Activity</h5>
        <input type="search" class="form-control w-auto" style="max-width: 280px;"
          placeholder="Search records" />
      </div>
      <div>
        <p class="text-muted">No recent activity logged.</p>
      </div>
    </div>

    <!-- Services Booked Table with Book Service Button -->
    <div class="row g-4">
      <div class="col-lg-6">
        <div class="card p-3">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0">📝 Services Booked</h5>
            <a href="Booking.html" class="btn btn-primary btn-sm">+ Book Service</a>
          </div>
          <div class="table-responsive">
            <table class="table table-sm align-middle">
              <thead>
                <tr>
                  <th>Car</th>
                  <th>Service</th>
                  <th>Technician</th>
                  <th>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                <!-- Empty for now -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Technicians Table -->
      <div class="col-lg-6">
        <div class="card p-3">
          <h5 class="mb-3">🧑‍🔧 Technicians</h5>
          <div class="table-responsive">
            <table class="table table-sm align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialty</th>
                  <th>Experience</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <!-- Empty for now -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Inventory Table -->
    <div class="card p-3 mt-4">
      <h5 class="mb-3">📦 Inventory</h5>
      <div class="table-responsive">
        <table class="table table-sm align-middle">
          <thead>
            <tr>
              <th>Item-Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit-Price</th>
              <th>Supplier</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <!-- Empty for now -->
          </tbody>
        </table>
      </div>
    </div>

    <!-- Notifications -->
    <div class="card p-3 mt-4">
      <h5 class="mb-3">🔔 Notifications</h5>
      <div class="alert alert-warning">⚠️ No notifications yet</div>
    </div>

  </div>
    </main>

</template>

<style scoped>


         :root {
      --primary: #4f46e5;
      --secondary: #2563eb;
      --accent: #16a34a;
      --success: #15803d;
      --surface: #ffffff;
      --border: #e2e8f0;
      --text: #0f172a;
      --muted: #475569;
    }

    body {
      background: linear-gradient(135deg, #f7efe4 0%, #efe2cf 55%, #e7d8bc 100%);
      background-image: url('https://res.cloudinary.com/na4iwacu/image/upload/v1784315664/OAS_background_vqd9xf.jpg');
      background-size: cover;
      background-position: center;
      color: var(--text);
      font-family: Arial, sans-serif;
      min-height: 100vh;
    }

    .card {
      border: 1px solid var(--border);
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
      background: var(--surface);
    }

    .stat-card {
      min-height: 120px;
      background: linear-gradient(135deg, #eef2ff, #f0fdf4);
    }

    .table-responsive {
      max-height: 360px;
      overflow: auto;
    }

    .table thead {
      background: linear-gradient(90deg, #eef2ff, #f0fdf4);
    }

    .table td, .table th {
      color: var(--text);
      border-color: rgba(255,255,255,0.08);
    }

    .badge {
      background: linear-gradient(135deg, var(--primary), var(--secondary)) !important;
    }

    .form-control {
      background: #f8fafc;
      color: var(--text);
      border: 1px solid rgba(255,255,255,0.14);
    }

    .form-control:focus {
      border-color: var(--secondary);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.28);
    }





    /* ===== ADDED: Header + Navbar ===== */
header {
  background: rgba(30, 41, 59, 0.9);
  padding: 16px 0;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.logo {
  color: #fff;
  font-weight: 800;
  font-size: 1.8rem;
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.5px;
}

.logo span {
  color: var(--accent);
  font-weight: 600;
}

.navbar {
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.85) !important;
}

.navbar-brand, .nav-link {
  font-weight: 600;
  color: var(--text) !important;
  transition: color 0.2s ease;
}

.nav-link:hover, .nav-link.active {
  color: var(--primary) !important;
}

.dropdown-menu {
  border-radius: 12px;
  border: 1px solid var(--border);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.1);
}

/* ===== ADDED: Stat Cards Enhancement ===== */
.stat-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  border: 1px solid rgba(79, 70, 229, 0.1);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 35px rgba(15, 23, 42, 0.12);
}

.stat-card h3 {
  color: var(--primary);
  font-weight: 700;
  font-size: 2rem;
  margin: 8px 0;
}

/* ===== ADDED: Badge Pulse Animation ===== */
.badge.bg-success {
  background: linear-gradient(135deg, var(--accent), var(--success)) !important;
  animation: pulse 2s infinite;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(22, 163, 74, 0); }
}

/* ===== ADDED: Buttons ===== */
.btn-outline-success {
  border-color: var(--accent);
  color: var(--accent);
  font-weight: 600;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.btn-outline-success:hover {
  background: var(--accent);
  color: #fff;
  transform: translateY(-1px);
}

/* ===== ADDED: Tables ===== */
.table {
  border-collapse: separate;
  border-spacing: 0;
}

.table tbody tr {
  transition: background 0.15s ease;
}

.table tbody tr:hover {
  background: #f8fafc;
}

.table thead th {
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

/* ===== ADDED: Activity List + Search ===== */
#activityList {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 8px;
}

#searchInput {
  border-radius: 10px;
  border: 1px solid var(--border);
}

#searchInput:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

/* ===== ADDED: Scrollbar Styling ===== */
.table-responsive::-webkit-scrollbar,
#activityList::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.table-responsive::-webkit-scrollbar-thumb,
#activityList::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 8px;
}

.table-responsive::-webkit-scrollbar-thumb:hover,
#activityList::-webkit-scrollbar-thumb:hover {
  background: var(--muted);
}

/* ===== Footer ===== */
footer {
  text-align: center;
  padding: 20px;
  color: #fff;
  font-size: 0.9rem;
  background: rgba(30, 41, 59, 0.9);
  border-top: 1px solid rgba(226, 232, 240, 0.5);
  margin-top: 32px;
}

/* ===== ADDED: Responsive Tweaks ===== */
@media (max-width: 768px) {
  .stat-card h3 {
    font-size: 1.5rem;
  }
  
  .logo {
    font-size: 1.4rem;
  }
  
  .navbar .form-control {
    margin-top: 8px;
  }
}

</style>