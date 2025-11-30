export default function Footer() {
  return (
    <footer className="footer p-10 bg-base-900 text-base-content border-t border-base-700">
      <aside>
        <div className="text-gold-500 text-3xl font-bold mb-2">HOC</div>
        <p>Luxury Interior Products</p>
        <p className="text-base-400 text-sm">Premium home decor and furniture</p>
      </aside>

      <nav>
        <h6 className="footer-title text-base-50">Shop</h6>
        <a className="link link-hover">Furniture</a>
        <a className="link link-hover">Lighting</a>
        <a className="link link-hover">Decor</a>
        <a className="link link-hover">Art</a>
      </nav>

      <nav>
        <h6 className="footer-title text-base-50">Company</h6>
        <a className="link link-hover">About</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Careers</a>
        <a className="link link-hover">Blog</a>
      </nav>

      <nav>
        <h6 className="footer-title text-base-50">Legal</h6>
        <a className="link link-hover">Terms of Service</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Cookie Policy</a>
      </nav>

      <nav>
        <h6 className="footer-title text-base-50">Connect</h6>
        <a className="link link-hover">Instagram</a>
        <a className="link link-hover">Facebook</a>
        <a className="link link-hover">Twitter</a>
        <a className="link link-hover">Newsletter</a>
      </nav>
    </footer>
  );
}
