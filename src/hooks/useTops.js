import { useState, useEffect } from "react";
import useWeb3 from "./useWeb3";

export default function useTops({ donations }) {
  const [tops, setTops] = useState(false);
  const { maticPrice } = useWeb3();

  useEffect(() => {
    if (donations.length > 0 && maticPrice) {
      readLeaderboard();
    }
  }, [donations, maticPrice]);

  const truncateDecimals = function (number, digits) {
    var multiplier = Math.pow(10, digits),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

    return truncatedNum / multiplier;
  };

  const readLeaderboard = () => {
    const unixTime = Math.round(new Date().getTime() / 1000);
    const lastDay = unixTime - 86400;
    const lastWeek = unixTime - 604800;
    const lastMonth = unixTime - 2592000;

    let dayData = [];
    let weekData = [];
    let monthData = [];
    let globalData = [];

    // Filtrar por preiodo de tiempo y usuarios registrados

    donations.forEach((data) => {
      let created = data.createdAt;

      if (created > lastDay) {
        const array = {
          photo: data.photo,
          name: data.name,
          amount: parseFloat(data.amount),
          id: data.id,
        };
        dayData = dayData.concat(array);
      }

      if (created > lastWeek) {
        const array = {
          photo: data.photo,
          name: data.name,
          amount: parseFloat(data.amount),
          id: data.id,
        };
        weekData = weekData.concat(array);
      }

      if (created > lastMonth) {
        const array = {
          photo: data.photo,
          name: data.name,
          amount: parseFloat(data.amount),
          id: data.id,
        };
        monthData = monthData.concat(array);
      }

      const array = {
        photo: data.photo,
        name: data.name,
        amount: parseFloat(data.amount),
        id: data.id,
      };
      globalData = globalData.concat(array);
    });

    // Agrupar por usuario

    let dayObject = [];
    dayData.forEach((x) => {
      if (!dayObject.hasOwnProperty(x.id)) {
        dayObject[x.id] = [];
      }
      dayObject[x.id].push({ ...x });
    });

    let weekObject = [];
    weekData.forEach((x) => {
      if (!weekObject.hasOwnProperty(x.id)) {
        weekObject[x.id] = [];
      }
      weekObject[x.id].push({ ...x });
    });

    let monthObject = [];
    monthData.forEach((x) => {
      if (!monthObject.hasOwnProperty(x.id)) {
        monthObject[x.id] = [];
      }
      monthObject[x.id].push({ ...x });
    });

    let globalObject = [];
    globalData.forEach((x) => {
      if (!globalObject.hasOwnProperty(x.id)) {
        globalObject[x.id] = [];
      }
      globalObject[x.id].push({ ...x });
    });

    // Suma total de partidas y cantidad de dinero jugado por usuario

    const day = Object.values(dayObject).map((users, index) => {
      const amounts = users.map((data) => parseFloat(data.amount));
      const amount = amounts.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }, 0);
      const usd = truncateDecimals(parseFloat(amount * maticPrice), 2);
      const user = users[users.length - 1];
      const top = {
        index: index + 1,
        id: user.id,
        photo: user.photo,
        name: user.name,
        donations: users.length,
        amount: usd,
      };
      return top;
    });

    const week = Object.values(weekObject).map((users, index) => {
      const amounts = users.map((data) => parseFloat(data.amount));
      const amount = amounts.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }, 0);
      const usd = truncateDecimals(parseFloat(amount * maticPrice), 2);
      const user = users[users.length - 1];
      const top = {
        index: index + 1,
        id: user.id,
        photo: user.photo,
        name: user.name,
        donations: users.length,
        amount: usd,
      };
      return top;
    });

    const month = Object.values(monthObject).map((users, index) => {
      const amounts = users.map((data) => parseFloat(data.amount));
      const amount = amounts.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }, 0);
      const usd = truncateDecimals(parseFloat(amount * maticPrice), 2);
      const user = users[users.length - 1];
      const top = {
        index: index + 1,
        id: user.id,
        photo: user.photo,
        name: user.name,
        donations: users.length,
        amount: usd,
      };
      return top;
    });

    const global = Object.values(globalObject).map((users, index) => {
      const amounts = users.map((data) => parseFloat(data.amount));
      const amount = amounts.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }, 0);
      const usd = truncateDecimals(parseFloat(amount * maticPrice), 2);
      const user = users[users.length - 1];
      const top = {
        index: index + 1,
        id: user.id,
        photo: user.photo,
        name: user.name,
        donations: users.length,
        amount: usd,
      };
      return top;
    });

    var donation = {};
    donation.day = [...day].sort((a, b) => b.donations - a.donations);
    donation.week = [...week].sort((a, b) => b.donations - a.donations);
    donation.month = [...month].sort((a, b) => b.donations - a.donations);
    donation.global = [...global].sort((a, b) => b.donations - a.donations);

    var amount = {};
    amount.day = [...day].sort((a, b) => b.amount - a.amount);
    amount.week = [...week].sort((a, b) => b.amount - a.amount);
    amount.month = [...month].sort((a, b) => b.amount - a.amount);
    amount.global = [...global].sort((a, b) => b.amount - a.amount);

    setTops({ donation, amount });
  };

  return { tops };
}
