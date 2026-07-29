(function attachGroupInviteLink(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.GroupInviteLink = api;
})(typeof globalThis === 'object' ? globalThis : this, function createApi() {
  const tokenPattern = /^[0-9a-fA-F]{16,64}$/;

  function parameters(value) {
    try {
      return new URLSearchParams(value);
    } catch (_) {
      return new URLSearchParams();
    }
  }

  function firstToken(params) {
    return params.get('token') || params.get('t');
  }

  function getToken(locationLike) {
    const fromFragment = firstToken(
      parameters((locationLike.hash || '').replace(/^#/, '')),
    );
    if (fromFragment) return fromFragment;
    return firstToken(parameters(locationLike.search || ''));
  }

  function isValidToken(token) {
    return typeof token === 'string' && tokenPattern.test(token);
  }

  function buildAppDeepLink(packageName, token) {
    return `${packageName}://group-invite#token=${encodeURIComponent(token)}`;
  }

  return Object.freeze({getToken, isValidToken, buildAppDeepLink});
});
