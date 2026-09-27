// WebSocket or event connection stub for Cmajor / Amorph patch host communication

export interface PatchConnection {
  sendEventOrValue: (endpoint: string, value: any) => void;
  requestParameterValue?: (endpoint: string) => void;
  addParameterListener?: (endpoint: string, callback: (value: any) => void) => void;
  removeParameterListener?: (endpoint: string, callback: (value: any) => void) => void;
}

class AmorphPatchConnection {
  private static instance: AmorphPatchConnection;
  public connection: PatchConnection;

  private constructor() {
    this.connection = {
      sendEventOrValue: (endpoint: string, value: any) => {
        // Broadcast to window or host if running embedded
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('cmajor-patch-event', {
              detail: { endpoint, value }
            })
          );
        }
      },
      requestParameterValue: (endpoint: string) => {},
      addParameterListener: (endpoint: string, callback: (value: any) => void) => {},
      removeParameterListener: (endpoint: string, callback: (value: any) => void) => {}
    };
  }

  public static getInstance(): AmorphPatchConnection {
    if (!AmorphPatchConnection.instance) {
      AmorphPatchConnection.instance = new AmorphPatchConnection();
    }
    return AmorphPatchConnection.instance;
  }
}

export function getAmorphPatchConnection() {
  return AmorphPatchConnection.getInstance();
}
