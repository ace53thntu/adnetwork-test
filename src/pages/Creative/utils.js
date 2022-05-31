import {AdvertiserAPIRequest} from "../../api/advertiser.api";
import {IS_RESPONSE_ALL} from "../../constants/misc";
import {ConceptAPI} from "../../api/concept.api";

const DEFAULT_PAGE = 1;
const TOTAL_ITEMS = 1000;

export const getAllConceptTreeData = async () => {
  let advertiserDataMap;
  const params = {
    page: DEFAULT_PAGE,
    per_page: TOTAL_ITEMS,
  };
  const response = await AdvertiserAPIRequest.getAllAdvertiser({
    params,
    options: {
      isResponseAll: IS_RESPONSE_ALL
    }
  });

  const { data: advertiserData } = response?.data || {};
  if(advertiserData){
    let promises = [];
    advertiserData.forEach(item => {
      const { uuid: advertiserUUID } = item || {};
      promises.push(ConceptAPI.getConcepts({
        params: {
          advertiser_uuid: advertiserUUID,
          page: DEFAULT_PAGE,
          per_page: TOTAL_ITEMS
        }
      }));
    })

    const promiseAll = await Promise.all(promises);
    let allConcepts = promiseAll.reduce((a, b) => a.concat(b?.data), []);
    allConcepts = allConcepts.map(
      concept => {
        const { name: conceptName, uuid: conceptUUID } = concept || {};
        return {
          ...concept, title: conceptName, value: conceptUUID, isConcept: true
        }
      }
    )

    advertiserDataMap = advertiserData.map(adv => {
      const { name: advName, uuid: advUUID } = adv || {};
      const children = allConcepts.filter(concept => concept.advertiser_uuid === advUUID);
      return { ...adv, title: advName, value: advUUID, isAdvertiser: true, children };
    })

  }
  return advertiserDataMap;
}
