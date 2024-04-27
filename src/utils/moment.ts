import moment from "moment";

export const formatDate = (date: any) => {
  if (date) return moment(new Date(date)).format("LL");
};
