import { Helmet } from 'react-helmet-async';
import CreatePackage from 'src/sections/packages/CreatePackage';

// ----------------------------------------------------------------------

export default function CreatePackagePage() {
  return (
    <>
      <Helmet>
        <title> Packages | FService </title>
      </Helmet>

      <CreatePackage />
    </>
  );
}
