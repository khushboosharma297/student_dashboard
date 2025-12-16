export const getDashboard = async () => {
  const res = await fetch("http://localhost:4000/dashboard/1");
  return res.json();
};
