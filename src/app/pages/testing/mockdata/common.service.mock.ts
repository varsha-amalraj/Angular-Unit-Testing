import { AuthUserData, LoginFormData, SignInParams } from "../../model";

export const logInRequestMock: LoginFormData = {
  mobile_no: '9000000001',
  password: '123456',
};

export const logInResponseMock: AuthUserData = {
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVObyI6IjkwMDAwMDAwMDEiLCJpYXQiOjE2MjEwNjczNTZ9.wD_ltBfn90RT74xjOYSFybN5nQ2w8farBbyr8NeZzuc',
  id: 1,
  mobile_no: '9000000001',
  role: 'Admin',
  name: 'Varsha'
};
export const authState = () => ({
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVObyI6IjkwMDAwMDAwMDEiLCJpYXQiOjE2MjEwNjczNTZ9.wD_ltBfn90RT74xjOYSFybN5nQ2w8farBbyr8NeZzuc',
  id: 1,
  mobile_no: '9000000001',
  role: 'Admin',
  name: 'Varsha'
});
