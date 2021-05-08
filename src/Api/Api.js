import { get, post } from "Utils/Axios";

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

const submitGroupAnswer = async (gid,answers) => {
  try {
    const { data } = await post(`/group/group/${gid}/answer`, answers, false, true);
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

const getQuestionnaires = async (groupId) => {
  try {
    const { data } = await get(
      `/group/group/${groupId}/questionnaires`,
      false,
      true
    );
    return data.data;
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

export {
  getQuestionnaireByQid,
  getGroupQuestionnaireByQid,
  submitGroupAnswer,
  submitAnswer,
  getQuestionnaires,
  inviteUser,
  getMyNotifications,
  responseInvitation,
};
