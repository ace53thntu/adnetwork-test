import {lazy} from 'react';

const CACHE_KEY = `${window.location.host}-page-has-been-force-refreshed`;

export const lazyWithRetry = componentImport =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.localStorage.getItem(CACHE_KEY) || 'false'
    );

    try {
      const component = await componentImport();

      window.localStorage.setItem(CACHE_KEY, 'false');

      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        // Assuming that the user is not on the latest version of the application.
        // Let's refresh the page immediately.
        window.localStorage.setItem(CACHE_KEY, 'true');
        return window.location.reload();
      }

      // The page has already been reloaded
      // Assuming that user is already using the latest version of the application.
      // Let's let the application crash and raise the error.
      throw error;
    }
  });
