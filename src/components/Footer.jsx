export default function Footer() {
  return (
    <footer className='page-footer light-green'>
      <div className='footer-copyright  light-green darken-4'>
        <div className='container'>
          © {new Date().getFullYear()} Copyright
          <a className='grey-text text-lighten-4 right' href='#!'>
            Repository
          </a>
        </div>
      </div>
    </footer>
  );
}
