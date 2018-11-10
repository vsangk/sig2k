import axios from 'axios';

const teamId = '5bd8d111383bff0004154311';
const channel = 'CDRFH8NQ1';

export const getUnrankedPlayers = (size = 100) => {
  return axios
    .get(
      `https://sigpong.herokuapp.com/api/users/unranked?team_id=${teamId}&size=${size}`
    )
    .then(res => res.data._embedded.users);
};

export const getRankedPlayers = (size = 100) => {
  return axios
    .get(
      `https://sigpong.herokuapp.com/api/users/ranked?team_id=${teamId}&size=${size}`
    )
    .then(res => res.data._embedded.users);
};

export const getRecentMatches = (size = 10) => {
  return axios
    .get(
      `https://sigpong.herokuapp.com/api/matches?team_id=${teamId}&size=${size}`
    )
    .then(res => res.data._embedded.matches);
};

export const getRecentMatchesByUser = (userName, size = 10) => {
  return axios
    .get(
      `https://sigpong.herokuapp.com/api/matches/user?team_id=${teamId}&user_name=${userName}&size=${size}`
    )
    .then(res => res.data._embedded.matches);
};

export const getUser = userName => {
  return axios
    .get(
      `https://sigpong.herokuapp.com/api/users/user?team_id=${teamId}&user_name=${userName}`
    )
    .then(res => res.data);
};

export const getUsers = ()  => {
    return axios
        .get(
            `https://sigpong.herokuapp.com/api/users?team_id=${teamId}`
        )
        .then(res => res.data._embedded.users);
};

export const getOutstandingReports = () => {
    return axios
        .get(
            `https://sigpong.herokuapp.com/api/reports?team_id=${teamId}`
        )
        .then(res => res.data._embedded.reports);
};

export const createReport = (report) => {
    return axios
        .post(
            `https://sigpong.herokuapp.com/api/reports?team_id=${teamId}`, {
                channel: channel,
                reporter_ids: report.reporter_ids,
                opponent_ids: report.opponent_ids,
                scores: report.scores,
                reporter_team: report.reporter_team,
                opponent_team: report.opponent_team,
            }
        ).then(res =>res.data);
};
