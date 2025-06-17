let container;

const escape = (str) => str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

export function bstoast(options) {
  if (typeof options === 'string') options = { body: options };
  
  const { title = 'Alert', body, color = 'primary', append = true, timeout, icon } = options;
  
  if (!body) throw new Error('bstoast: body is required');
  if (typeof window === 'undefined' || !window.bootstrap) throw new Error('bstoast: Bootstrap 5 is required');
  
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    document.body.appendChild(container);
  }
  
  if (!append) container.innerHTML = '';
  
  const toast = document.createElement('div');
  toast.className = `toast text-bg-${color}`;
  toast.innerHTML = `
    <div class="toast-header">
      ${icon ? `<i class="bi bi-${icon} me-2"></i>` : ''}
      <strong class="me-auto">${escape(title)}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body">${escape(body)}</div>
  `;
  
  container.appendChild(toast);
  
  const bsToast = new window.bootstrap.Toast(toast, { autohide: timeout !== false, delay: timeout || 5000 });
  bsToast.show();
}