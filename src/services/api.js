import axios from 'axios';

const teamId = '5bd8d111383bff0004154311';

export const getUnrankedPlayers = (size = 100) => {
  axios
    .get(
      `http://sigpong.herokuapp.com/api/users/unranked?team_id=${teamId}&size=${size}`
    )
    .then(res => res.data._embedded.users);
};

export const getRankedPlayers = (size = 100) => {
  axios
    .get(
      `http://sigpong.herokuapp.com/api/users/ranked?team_id=${teamId}&size=${size}`
    )
    .then(res => res.data._embedded.users);
};

export const getRecentMatches = (size = 10) => {
  axios
    .get(
      `http://sigpong.herokuapp.com/api/matches?team_id=${teamId}&size=${size}`
    )
    .then(res => res.data._embedded.matches);
};

export const getRecentMatchesByUser = (userName, size = 10) => {
  axios
    .get(
      `http://sigpong.herokuapp.com/api/matches/user?team_id=${teamId}&user_name=${userName}&size=${size}`
    )
    .then(res => res.data._embedded.matches);
};

export const getUser = userName => {
  axios
    .get(
      `http://sigpong.herokuapp.com/api/users/user?team_id=${teamId}&user_name=${userName}`
    )
    .then(res => res.data);
};
