import { Helmet } from 'react-helmet-async';
import PackageCardDetail from 'src/sections/packages/PackageCardDetail';

// ----------------------------------------------------------------------

export default function CreatePackagePage() {
  return (
    <>
      <Helmet>
        <title> Packages | FService </title>
      </Helmet>

      <PackageCardDetail/>
    </>
  );
}
