export default defineEventHandler(async (event) => {
  const body: UpdateProfile = await useBody(event);
  console.log(body);
  return;
});
