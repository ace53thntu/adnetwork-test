import Campaign from 'pages/Campaign';

export const containerPages = {
  path: 'campaign',
  element: <Campaign />,
  children: [
    {
      path: '',
      element: <Campaign />
      // canAccess: [MANAGER, TRADER]
    }
  ]
};
