import httpStatus from 'http-status';
import { Request, Response } from 'express';
import sendResponse from "../../shared/sendResponse";
import catchAsync from '../../shared/createAsync';
import { UsersService } from './user.service';
import ApiError from '../../../errors/ApiError';


// user register
const userRegister = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.createUserService(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  })
});

// User login
const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email and password are required');
  }

  // Call the login service
  const result = await UsersService.loginUserService(email, password);

  // Send the response with token and user details
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: result,
  });
});

// update user 
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  const result = await UsersService.updateUserService(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
    data: result,
  })
});

// change password
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req?.user?.id; // Assuming req.user is set from your JWT middleware
  await UsersService.changePasswordService(userId, currentPassword, newPassword);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully!',
    data: null,
  })
});

// Show All Users
const showAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.showAllUsersService();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched all users successfully!',
    data: result,
  });
});

export const UsersController = {
  userRegister,
  userLogin,
  updateUser,
  changePassword,
  showAllUsers,
};