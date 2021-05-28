import { get, getPages, post } from "Utils/Axios";

const getJoinedGroups = async () => {
  try {
    const { data } = await get("/group/group", false, true);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getMyGroups = async () => {
  try {
    const { data } = await get("/account/user/groups", false, true);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getMyQuestionnairesPage = async (current, size) => {
  try {
    const { data } = await getPages(
      "/account/user/my-questionnaire",
      current,
      size,
      false,
      true
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getQuestionnaireByQid = async (qid) => {
  try {
    const { data } = await get(
      `/questionnaire/questionnaire/${qid}`,
      false,
      true
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteQuestionnaireByQid = async (qid) => {
  try {
    const { data } = await post(
      "/questionnaire/questionnaire/delete/" + qid,
      null,
      false,
      true
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const publishQuestionnaire = async (updateInfo) => {
  try {
    const { data } = await post(
      "/questionnaire/questionnaire/publish",
      updateInfo,
      false,
      true
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const preserveQuestionnaire = async (qid, questionnaire) => {
  const { data } = await post(
    "/questionnaire/questionnaire" + (qid ? "/questions" : ""),
    questionnaire,
    false,
    true
  );
  return data;
};

const getGroupQuestionnaireByQid = async (gid, qid) => {
  try {
    const { data } = await get(
      `/group/group/${gid}/questionnaire/${qid}`,
      false,
      true
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const submitGroupAnswer = async (gid, answers) => {
  try {
    const { data } = await post(
      `/group/group/${gid}/answer`,
      answers,
      false,
      true
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const submitAnswer = async (answers) => {
  try {
    const { data } = await post("/questionnaire/answer", answers, false, true);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getQuestionnairesByGroupId = async (groupId) => {
  try {
    const { data } = await get(
      `/group/group/${groupId}/questionnaires`,
      false,
      true
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const inviteUser = async (req) => {
  try {
    const { data } = await post("/group/group/invitation", req, false, true);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const leaveGroupByGroupId = async (groupId) => {
  try {
    const { data } = await get(`/group/group/leave/${groupId}`, false, true);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getMyNotifications = async (groupId) => {
  try {
    const { data } = await get(`/account/user/notification`, false, true);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const responseInvitation = async (req) => {
  try {
    const { data } = await post("/account/user/invitation", req, false, true);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const register = async (registerForm) => {
  try {
    const { data } = await post(
      "/account/user/register",
      registerForm,
      false,
      false
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProfiles = async () => {
  try {
    const { data } = await get("/account/user/profiles", false, true);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateProfiles = async (profiles) => {
  try {
    const { data } = await post(
      "/account/user/profiles",
      profiles,
      false,
      true
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAnalysisByQid = async (qid) => {
  try {
    const { data } = await get(`/analysis/analysis/${qid}`, false, true);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPassAnalysis = async (qid, group, question) => {
  try {
    let url = `/analysis/analysis/pass/${qid}?group=${group}`;
    if (question) {
      url += "&question=" + question;
    }
    const { data } = await get(url, false, true);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getJoinedGroups,
  getMyGroups,
  getMyQuestionnairesPage,
  getQuestionnaireByQid,
  getGroupQuestionnaireByQid,
  deleteQuestionnaireByQid,
  publishQuestionnaire,
  preserveQuestionnaire,
  submitGroupAnswer,
  submitAnswer,
  getQuestionnairesByGroupId,
  inviteUser,
  leaveGroupByGroupId,
  getMyNotifications,
  responseInvitation,
  register,
  getProfiles,
  updateProfiles,
  getAnalysisByQid,
  getPassAnalysis,
};
