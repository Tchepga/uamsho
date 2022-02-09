import axios from 'axios';
import debate from '../model/debate';
import { user } from '../model/user';
import Utils from '../utils/Utils';
const DebateService = {


  async getDebate(debateId: number): Promise<debate> {
    if (debateId !== 0) {
      const response = await axios
        .get(process.env.REACT_APP_API_URL + "/api/debate/" + debateId)
        .catch((error: any) => console.error(error));

      return response?.data;
    } else {
      throw new Error("Invalid debateId!")
    }
  },

  async getAllDebates(): Promise<any> {

    const response = await axios
      .get(process.env.REACT_APP_API_URL + "/api/debate")
      .catch((error: any) => console.error(error));

    return response?.data;

  },

  async getSimilardebate(debateId: number): Promise<Array<debate>> {
    if (debateId !== 0) {
      const response = await axios
        .get(process.env.REACT_APP_API_URL + "/api/debate/" + debateId + "/similar")
        .catch((error) => console.log(error));

      return response?.data;
    } else {
      throw new Error("Invalid debateId!");
    }
  },

  addComment(content: string, email: string, debateId: number) {
    axios
      .post(process.env.REACT_APP_API_URL + "/api/debate/" + debateId + "/add-comment",
        { content: content, email: email, id: debateId })
      .then((res) => {
        if (res.status === Utils.CREATED_STATUS) {
          this.getDebate(debateId);
        };
      })
      .catch((error) => console.error(error));

  },

  deleteComment(pk: number, user: user) {
    // check role
    // call axios api request to delete

    console.log("DeleteComment not implemented!")
  }
}

export default DebateService;