export const Logoutfunc = async (e: any) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    throw error;
  } finally {
    dispatch({ user: false });
    console.log(state.user);
  }
  console.log(state.user);
};
