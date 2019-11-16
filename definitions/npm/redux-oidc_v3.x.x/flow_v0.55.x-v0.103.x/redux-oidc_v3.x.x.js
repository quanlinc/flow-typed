declare module "redux-oidc" {

  /**
   * S = State
   * A = Action
   * D = Dispatch
   *
   * Below type definitions are copied from redux_v4.x.x.js
   * The issue is that flow will silenty cast cross referenced types to any, end up losing type information
   * except for those builtin ones.
   * ticket discussing this issue https://github.com/flow-typed/flow-typed/issues/1857
   * also mentioned here not to do it! https://github.com/flow-typed/flow-typed/blob/master/CONTRIBUTING.md#dont-import-types-from-other-libdefs
   */ 
  declare type DispatchAPI<A> = (action: A) => A;

  declare type Dispatch<A: { type: *, ... }> = DispatchAPI<A>;

  declare type Reducer<S, A> = (state: S | void, action: A) => S;

  declare type Store<S, A, D = Dispatch<A>> = {
    // rewrite MiddlewareAPI members in order to get nicer error messages (intersections produce long messages)
    dispatch: D,
    getState(): S,
    subscribe(listener: () => void): () => void,
    replaceReducer(nextReducer: Reducer<S, A>): void,
    ...
  };
  // end of copied types
  
  declare type UserManager = {
    getUser: () => Promise<User<*>>,
    removeUser: () => Promise<*>,
    signinRedirect: (data?: {
      data: {
        redirectUrl: string
      }
    }) => Promise<*>,
    signinSilent: () => Promise<*>,
    signinPopup: () => Promise<*>,
    signoutRedirect: () => Promise<*>,
    signoutPopup: () => Promise<*>,
    querySessionStatus: () => Promise<*>,
    startSilentRenew: () => Promise<*>,
    stopSilentRenew: () => Promise<*>,
    clearStaleState: () => Promise<*>
  };
  declare type User<P> = {
    id_token: string,
    access_token: string,
    token_type: string,
    scope: string,
    expires_at: number,
    +expires_in: ?boolean,
    +expired: ?boolean,
    +scopes: Array<string>,
    profile: P,
    state: {
      redirectUrl: string
    }
  };
  declare type UserManagerSettings = {|
    client_id: string,
    authority: string,
    redirect_uri: string,
    response_type?: string,
    scope?: string,
    loadUserInfo?: boolean,
    silent_redirect_uri?: string,
    automaticSilentRenew?: boolean,
    accessTokenExpiringNotificationTime?: number,
    silentRequestTimeout?: number,
    filterProtocolClaims?: boolean,
    post_logout_redirect_uri?: string
  |};
  declare type OidcReducerState = {
    user: ?User<*>
  };
  declare type OidcReducer = Reducer<OidcReducerState, *>;

  declare function createUserManager(
    settings: UserManagerSettings
  ): UserManager;
  declare var reducer: OidcReducer;

  declare class CallbackComponent extends React$Component<{
    userManager: UserManager,
    successCallback: (user?: User<*>) => mixed,
    errorCallback?: () => mixed
  }> {}

  declare class OidcProvider extends React$Component<{
    store: Store<*, *>,
    userManager: UserManager
  }> {}

  declare function processSilentRenew(): void;
}
