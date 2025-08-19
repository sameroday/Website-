export function Footer() {
  return (
    <footer className="text-center mt-20 py-8 border-t border-white/10 text-gray-400" data-testid="footer">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm" data-testid="copyright">
          © 2024 Venice Community. جميع الحقوق محفوظة.
        </p>
        <div className="flex gap-6" data-testid="social-links">
          <a
            href="#"
            className="text-primary hover:text-secondary transition-colors"
            data-testid="social-discord"
          >
            <i className="fab fa-discord text-xl"></i>
          </a>
          <a
            href="#"
            className="text-primary hover:text-secondary transition-colors"
            data-testid="social-twitter"
          >
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="#"
            className="text-primary hover:text-secondary transition-colors"
            data-testid="social-instagram"
          >
            <i className="fab fa-instagram text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
