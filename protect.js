
// Blochează Ctrl+U (view source), Ctrl+S (save), Ctrl+Shift+I se lasa
document.addEventListener('keydown', function(e) {
  // Ctrl+U - view source
  if (e.ctrlKey && e.key === 'u') {
    e.preventDefault();
    return false;
  }
  // Ctrl+S - save page
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    return false;
  }
  // F12 se lasa - inspect ramane disponibil
});