import { get } from "Utils/Axios";

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

export { getQuestionnaires };
