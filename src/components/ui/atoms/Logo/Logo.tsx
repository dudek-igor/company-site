import { Link } from '@/i18n/routing';

const Logo = () => (
  <div className="min-w-[190px] flex justify-center items-center">
    <Link className="text-nowrap text-3xl font-light text-accented-primary" href="/">
      Hello Software
    </Link>
    {/* Add sr-only when create real one logo */}
    {/* <span className="sr-only">Hello Software</span> */}
  </div>
);
export default Logo;
