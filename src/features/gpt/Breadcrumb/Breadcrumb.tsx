import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  path: string;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    ...pathnames.map((value, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      return { name: value.charAt(0).toUpperCase() + value.slice(1), path };
    }),
  ];

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) =>
        index === breadcrumbs.length - 1 ? (
          <Typography key={breadcrumb.path} color="textPrimary">
            {breadcrumb.name}
          </Typography>
        ) : (
          <Link
            key={breadcrumb.path}
            component={RouterLink}
            to={breadcrumb.path}
            underline="hover"
            color="inherit"
          >
            {index === 0 ? <HomeIcon fontSize="small" /> : null} {breadcrumb.name}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
