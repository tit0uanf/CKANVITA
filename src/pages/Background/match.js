var ongoing_matches_list = null;
var isMatchOngoing = false;

const fetchMatchesDataBackground = async () => {
  console.log('Fetching matches data...');
  const result_ongoing = await fetch(
    'https://vchecker-production.up.railway.app/ongoing'
  );
  const result_upcoming = await fetch(
    'https://vchecker-production.up.railway.app/upcoming'
  );
  const fetchedOngoingMatchesData = await result_ongoing.json();
  const fetchedUpcomingMatchesData = await result_upcoming.json();

  if (result_ongoing.ok && result_upcoming.ok) {
    const fetchedMatchesData = JSON.parse('{"matches_list":[]}');
    fetchedMatchesData.matches_list =
      fetchedOngoingMatchesData.matches_list.concat(
        fetchedUpcomingMatchesData.matches_list
      );

    ongoing_matches_list = fetchedMatchesData.matches_list;
    checkMatchOngoing();

    console.log('ONGOING :', fetchedOngoingMatchesData);
    console.log('UPCOMING :', fetchedUpcomingMatchesData);

    chrome.storage.local.set({ matches: fetchedMatchesData }).then(() => {
      console.log('Store matches data');
    });
  } else {
    console.log('Error fetching matches data');
  }
};

const fetchResultsDataBackground = async (game) => {
  console.log('Fetching results data... ');
  const result = await fetch(
    'https://vchecker-production.up.railway.app/results/' + game
  );

  const fetchedResultsData = await result.json();

  if (result.ok) {
    console.log(game + ' Results Data :', fetchedResultsData);

    if (game === 'lec') {
      chrome.storage.local.set({ results_lec: fetchedResultsData }).then(() => {
        console.log('Store results lec data');
      });
    } else if (game === 'cs') {
      chrome.storage.local.set({ results_cs: fetchedResultsData }).then(() => {
        console.log('Store results cs data');
      });
    } else if (game === 'rl') {
      chrome.storage.local.set({ results_rl: fetchedResultsData }).then(() => {
        console.log('Store results rl data');
      });
    } else if (game === 'lfl') {
      chrome.storage.local.set({ results_lfl: fetchedResultsData }).then(() => {
        console.log('Store results lfl data');
      });
    } else if (game === 'vct') {
      chrome.storage.local.set({ results_vct: fetchedResultsData }).then(() => {
        console.log('Store results vct data');
      });
    }
  }
  return fetchedResultsData;
};

const fetchStandingsDataBackground = async (game) => {
  console.log('Fetching standings data... ');
  const result = await fetch(
    'https://vchecker-production.up.railway.app/standings/' + game
  );

  const fetchedStandingsData = await result.json();

  if (result.ok) {
    console.log('Standings Data :', fetchedStandingsData);

    if (game === 'lec') {
      chrome.storage.local
        .set({ standings_lec: fetchedStandingsData })
        .then(() => {
          console.log('Store standings lec data');
        });
    } else if (game === 'lfl') {
      chrome.storage.local
        .set({ standings_lfl: fetchedStandingsData })
        .then(() => {
          console.log('Store standings lfl data');
        });
    } else if (game === 'vct') {
      chrome.storage.local
        .set({ standings_vct: fetchedStandingsData })
        .then(() => {
          console.log('Store standings vct data');
        });
    }
    return fetchedStandingsData;
  }
};

const checkMatchOngoing = () => {
  if (ongoing_matches_list && ongoing_matches_list.length > 0) {
    ongoing_matches_list.forEach((match) => {
      if (match.status === 'live') {
        isMatchOngoing = true;
        chrome.action.setBadgeText({ text: 'GAME' });
        chrome.action.setBadgeBackgroundColor({ color: '#DD0525' });
      }
    });
  }
  return isMatchOngoing;
};

export { fetchMatchesDataBackground };
export { fetchResultsDataBackground };
export { fetchStandingsDataBackground };
export { checkMatchOngoing };
