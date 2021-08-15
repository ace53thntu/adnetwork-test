export const ReportNav = t => {
  return [
    {
      icon: 'pe-7s-display2',
      label: t('dashboard'),
      to: '#/dashboard'
    }
  ];
};
export const AudiencesNav = t => {
  return [
    {
      icon: 'pe-7s-graph2',
      label: t('audiences'),
      to: '#/audience-management'
    }
  ];
};
export const CreativeNav = t => {
  return [
    {
      icon: 'pe-7s-graph3',
      label: t('creative'),
      to: '#/creative'
    }
  ];
};
export const CampaignNav = t => {
  return [
    {
      icon: 'pe-7s-network',
      label: t('campaign'),
      to: '#/campaigns'
    }
  ];
};

export const ContainerNav = (t, role) => {
  return [
    {
      icon: 'pe-7s-box1',
      label: 'Container',
      to: '#/container'
    }
  ];
};

export const OrganizationNav = (t, role) => {
  return [
    {
      icon: 'pe-7s-users',
      label: 'Organization',
      to: '#/organization'
    }
  ];
};

export const UserManagementNav = (t, role) => {
  return [
    {
      icon: 'pe-7s-users',
      label: t('Users management'),
      to: '#/users'
    }
  ];
};
