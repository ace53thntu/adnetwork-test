import {USER_ROLE} from 'pages/user-management/constants';
import {useGetUploaderConfig} from 'queries/uploader';
import {useGetMe} from 'queries/users';
import React from 'react';
import {useRoutes} from 'react-router-dom';
import {authenticatedRoutes} from 'routers/authenticated';
import {getRole, setRole, setUser} from 'utils/helpers/auth.helpers';
import {setUploaderConfig} from 'utils/helpers/storeUploaderConfig.helpers';

function AuthenticatedApp(props) {
  const role = getRole();
  console.log(
    '🚀 ~ file: AuthenticatedApp.js ~ line 10 ~ AuthenticatedApp ~ role',
    role
  );
  const {data: authUser, isFetching} = useGetMe({enable: true});

  const {data: configRes, isFetching: isFetchingConfig} = useGetUploaderConfig({
    enabled: !!authUser
  });
  let routes = [];

  React.useEffect(() => {
    if (!isFetching) {
      setUser(authUser);
      setRole(authUser?.role);
    }
  }, [isFetching, authUser]);

  React.useEffect(() => {
    if (!isFetchingConfig) {
      setUploaderConfig(configRes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingConfig]);
  console.log('authenticatedRoutes', authenticatedRoutes);

  if (role === USER_ROLE.ADMIN) {
    routes = authenticatedRoutes;
  } else {
    routes = [...authenticatedRoutes].map(item => {
      if (item?.children?.length) {
        const listMenuFilter = [];
        item.children.forEach(lv1 => {
          if (lv1?.canAccess?.length) {
            if (lv1.canAccess?.includes(role)) {
              listMenuFilter.push(lv1);
            }
          } else {
            const llvv1 = lv1?.children?.filter(lv2 => {
              if (lv2?.canAccess?.length) {
                return lv2.canAccess.includes(role);
              } else {
                return (
                  lv2?.children?.filter(lv3 => lv3?.canAccess?.includes(role))
                    .length > 0
                );
              }
            });
            if (llvv1?.length) {
              listMenuFilter.push({
                ...lv1,
                children: llvv1
              });
            }
          }
        });
        return {
          ...item,
          children: listMenuFilter
        };
      } else {
        return item;
      }
    });
  }

  // return <div>AuthenticatedApp</div>;
  const elements = useRoutes(routes);
  return elements;
}

AuthenticatedApp.propTypes = {};
AuthenticatedApp.defaultProps = {};

export {AuthenticatedApp};
