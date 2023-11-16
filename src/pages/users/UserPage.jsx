import { Helmet } from 'react-helmet-async';

import ViewUser from 'src/sections/listUser/ViewUser';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Packages | FService </title>
      </Helmet>

      <ViewUser />
    </>
  );
}
