export const getTokens = () => {
  return {
    'x-access-token': sessionStorage.getItem('accessToken'),
    'x-refresh': sessionStorage.getItem('refreshToken'),
    // 'Access-Control-Allow-Origin': '*',
  };
};
