/**
 * Nova Commerce Framework (NCF) Analytics Event Engine
 * Standardized GA4 / GTM event hooks for search & navigation telemetry
 */

export interface SearchEventPayload {
  search_term: string;
  results_count: number;
  timestamp: number;
}

export interface ZeroResultEventPayload {
  search_term: string;
  timestamp: number;
}

export interface ProductClickEventPayload {
  product_id: string;
  product_name: string;
  price: number;
  position?: number;
}

class NCFAnalytics {
  private logToConsole = process.env.NODE_ENV !== 'production';

  public trackSearchQuery(searchTerm: string, resultsCount: number) {
    const payload: SearchEventPayload = {
      search_term: searchTerm,
      results_count: resultsCount,
      timestamp: Date.now()
    };

    if (this.logToConsole) {
      console.log('[NCF Analytics] search_query:', payload);
    }

    // Dispatch native window event for GTM/GA4 listening
    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(
          new CustomEvent('ncf:analytics:search_query', { detail: payload })
        );
      } catch (_e) {
        try {
          const event = document.createEvent('CustomEvent');
          event.initCustomEvent('ncf:analytics:search_query', true, true, payload);
          window.dispatchEvent(event);
        } catch (_) {}
      }
    }
  }

  public trackZeroResultSearch(searchTerm: string) {
    const payload: ZeroResultEventPayload = {
      search_term: searchTerm,
      timestamp: Date.now()
    };

    if (this.logToConsole) {
      console.warn('[NCF Analytics] zero_result_search:', payload);
    }

    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(
          new CustomEvent('ncf:analytics:zero_result', { detail: payload })
        );
      } catch (_e) {
        try {
          const event = document.createEvent('CustomEvent');
          event.initCustomEvent('ncf:analytics:zero_result', true, true, payload);
          window.dispatchEvent(event);
        } catch (_) {}
      }
    }
  }

  public trackSearchProductClick(product: { id: string; name: string; price: number }, position?: number) {
    const payload: ProductClickEventPayload = {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      position
    };

    if (this.logToConsole) {
      console.log('[NCF Analytics] select_search_item:', payload);
    }

    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(
          new CustomEvent('ncf:analytics:select_search_item', { detail: payload })
        );
      } catch (_e) {
        try {
          const event = document.createEvent('CustomEvent');
          event.initCustomEvent('ncf:analytics:select_search_item', true, true, payload);
          window.dispatchEvent(event);
        } catch (_) {}
      }
    }
  }

  public trackFilterApplied(filterName: string, filterValue: any) {
    if (this.logToConsole) {
      console.log('[NCF Analytics] filter_applied:', { filterName, filterValue });
    }

    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(
          new CustomEvent('ncf:analytics:filter_applied', { detail: { filterName, filterValue } })
        );
      } catch (_e) {
        try {
          const event = document.createEvent('CustomEvent');
          event.initCustomEvent('ncf:analytics:filter_applied', true, true, { filterName, filterValue });
          window.dispatchEvent(event);
        } catch (_) {}
      }
    }
  }
}

export const ncfAnalytics = new NCFAnalytics();

if (typeof window !== 'undefined') {
  (window as any).NCFAnalytics = NCFAnalytics;
  (window as any).ncfAnalytics = ncfAnalytics;
}
