import { getAuthor } from "../utils/index.js";
const api = (config) => ({
  getListUser: () => config("get", `api/list-user`),

  //Login
  loginApi: ({ email, password }) =>
    config(
      "post",
      "/login",
      {
        email,
        password,
      },
      null
    ),

  //Forgot Password
  forgotPasswordApi: ({ email }) =>
    config(
      "post",
      "/api/forgot-password",
      {
        email,
      },
      null
    ),
  //Confirm Password
  confirmPasswordApi: ({ confirmPassword, newPassword, token }) =>
    config(
      "put",
      `/api/forgot-password/confirm-reset`,
      {
        confirmPassword,
        newPassword,
        token,
      },
      null
    ),

  //Change Password
  changePasswordApi: ({ oldPassword, newPassword, confirmPassword }) =>
    config(
      "put",
      `/api/account/change_password`,
      {
        oldPassword,
        newPassword,
        confirmPassword,
      },
      getAuthor
    ),

  getAccountInfo: () =>
    config("get", "/api/account/info", null, {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    }),

  //Api Card Education
  //GET Education
  getEducationApi: ({ accountId }) =>
    config("get", `/api/cv/${accountId}/education`, null, getAuthor),
  // GET Certificate
  getCertificateApi: ({ accountId }) =>
    config("get", `/api/cv/${accountId}/certificate`, null, getAuthor),
  //POST Education
  postEducationApi: ({ data, accountId }) =>
    config("post", `/api/cv/${accountId}/education`, { data }, getAuthor),
  postAvatarProfileApi: ({ avatar, accountId }) =>
    config("post", `/api/cv/${accountId}/profile/avatar`, avatar, getAuthor),
  //PUT Education
  putEducationApi: ({ data, accountId }) =>
    config("put", `/api/cv/${accountId}/education`, { data }, getAuthor),

  //DELETE Education
  deleteEducationApi: ({ accountId, educationId }) =>
    config(
      "delete",
      `/api/cv/${accountId}/education/${educationId}`,
      null,
      getAuthor
    ),

  //Api Card Certificate

  //POST Certificate
  postCertificateApi: ({ data, accountId }) =>
    config("post", `/api/cv/${accountId}/certificate`, { data }, getAuthor),

  //PUT Certificate
  putCertificateApi: ({ data, accountId }) =>
    config("put", `/api/cv/${accountId}/certificate`, { data }, getAuthor),

  //DELETE Certificate
  deleteCertificateApi: ({ accountId, certificateId }) =>
    config(
      "delete",
      `/api/cv/${accountId}/certificate/${certificateId}`,
      null,
      getAuthor
    ),

  //add user api
  addUserApi: (data) => config("post", `/api/people`, data, getAuthor),
  // get user profile api
  getUserProfile: ({ accountId, token }) =>
    config(
      "get",
      `/api/cv/${accountId}/profile`,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    ),
  // export profile skillset
  exportProfileUser: ({ type_export, accountId }) =>
    config("get", `/api/cv/${accountId}/${type_export}`, null, getAuthor),
  //get list category api
  getListCategories: () =>
    config("get", `/api/management/category`, null, getAuthor),
  // add category manage skillset
  postCategories: ({ description, name, color }) =>
    config(
      "post",
      `/api/management/category`,
      {
        description,
        name,
        color,
      },
      getAuthor
    ),
  // update category manage skillset
  putCategories: ({ description, name, id, color }) =>
    config(
      "put",
      `/api/management/category/${id}`,
      {
        description,
        name,
        color,
      },
      getAuthor
    ),
  // delete category manage skillset
  deleteCategories: ({ id }) =>
    config("delete", `/api/management/category/${id}`, null, getAuthor),
  // get list subcategory manage skillset
  getListSubCategories: (id) =>
    config(
      "get",
      `/api/management/category/${id}/sub_category`,
      null,
      getAuthor
    ),
  // add subcategory manage skillset
  postListSubCategories: ({ formData, categoryId }) =>
    config(
      "post",
      `/api/management/category/${categoryId}/sub_category`,
      formData,
      getAuthor
    ),
  // update subcategory skillset
  putListSubCategories: ({ formData, categoryId, id }) =>
    config(
      "put",
      `/api/management/category/${categoryId}/sub_category/${id}`,
      formData,
      getAuthor
    ),
  // delete subcategory manage skillset
  deleteListSubCategories: ({ categoryId, id }) =>
    config(
      "delete",
      `/api/management/category/${categoryId}/sub_category/${id}`,
      null,
      getAuthor
    ),
  // add detail subcategory manage skillset
  postDetailSubCategories: ({ formData, subCategoryId }) =>
    config(
      "post",
      `/api/management/sub_category/${subCategoryId}/detail_sub_category`,
      formData,
      getAuthor
    ),
  // update detail subcategory manage skillset
  putDetailSubCategories: ({ formData, subCategoryId, detailSubCategoryId }) =>
    config(
      "put",
      `/api/management/sub_category/${subCategoryId}/detail_sub_category/${detailSubCategoryId}`,
      formData,
      getAuthor
    ),
  // delete detail subcategory manage skillset
  deleteDetailSubCategories: ({ subCategoryId, detailSubCategoryId }) =>
    config(
      "delete",
      `/api/management/sub_category/${subCategoryId}/detail_sub_category/${detailSubCategoryId}`,
      null,
      getAuthor
    ),
  // delete employee
  deleteEmployeeApi: (employeeId) =>
    config("delete", `/api/people/${employeeId}`, null, getAuthor),
  // get profile skillset
  getProfileSkillSet: ({ searchQuery, accountId }) =>
    config(
      "get",
      `/api/cv/${accountId}/skillset${
        searchQuery ? `?search=${searchQuery}` : ""
      }`,
      null,
      getAuthor
    ),
  //getApiPosition
  getPositionProfileApi: () => config("get", "/api/position", null, getAuthor),
  // update profile skillset
  updateProfileSkillSet: ({ updatedData, accountId }) =>
    config("post", `/api/cv/${accountId}/skillset/`, updatedData, getAuthor),
  //putPersonalProfile
  putUserProfileApi: ({ data, accountId }) =>
    config("put", `/api/cv/${accountId}/profile`, { ...data }, getAuthor),
  //postAvatarUserProfile
  // getEmployeeApi: () => {
  //   config("get", "/api/people", null, {
  //     Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //   });
  // },
  getEmployeeApi: ({ page, search }) =>
    config("get", `/api/people?page=${page}&search=${search}`, null, getAuthor),

  //account info
  getAccountInfoApi: () => config("get", "/api/account/info", null, getAuthor),
  // Timeline API
  getTimelinesApi: (accountId) =>
    config("get", `/api/cv/${accountId}/timeline`, null, getAuthor),
  deleteTimelineApi: ({ accountId, timelineId }) =>
    config(
      "delete",
      `/api/cv/${accountId}/timeline/${timelineId}`,
      null,
      getAuthor
    ),
  addTimelineApi: ({ listTimelines, accountId }) =>
    config(
      "post",
      `/api/cv/${accountId}/timeline`,
      { listTimelines },
      getAuthor
    ),
  updateTimeLineApi: ({ accountId, id, title, startDate, endDate, content }) =>
    config(
      "put",
      `/api/cv/${accountId}/timeline/${id}`,
      { title, startDate, endDate, content },
      getAuthor
    ),
  //getPersonalProfile
  getUserProfileApi: (accountId) =>
    config("get", `/api/cv/${accountId}/profile`, null, getAuthor),
  //getApiGeneralSkill
  getGeneralSkillApi: (accountId) =>
    config(
      "get",
      `/api/cv/${accountId}/profile/general_skill`,
      null,
      getAuthor
    ),
  //getApiTotalMember
  getTotalMemberApi: () =>
    config("get", `/api/dashboard/total_member`, null, getAuthor),
  // get category all
  getCategoryAll: () =>
    config("get", `/api/management/category/all`, null, getAuthor),
  // get detail skill
  getDetailSkill: ({ id }) =>
    config("get", `/api/dashboard/detail_skill/${id}`, null, getAuthor),
  // config("get", `/api/dashboard/total_member`, null, getAuthor),
  //getTopMember
  getTopMemberApi: (category_id) =>
    config("get", `/api/dashboard/top_member/${category_id}`, null, getAuthor),
  //getTopTrending
  getTrendingSkill: (categoryId) =>
    config(
      "get",
      `/api/dashboard/trending_skill/${categoryId}`,
      null,
      getAuthor
    ),
  //getApiDepartment
  getDepartmentProfileApi: () =>
    config("get", "/api/department", null, getAuthor),
  getTimeLineByIdApi: (timelineId) =>
    config(
      "get",
      `/api/cv/${localStorage.getItem("accountId")}/timeline/${timelineId}`,
      null,
      getAuthor
    ),
});

export default api;
