const RequestCreator = require("./RequestCreator");

//NOTE: General parameter layouts: relevantInformation, offenseInformation, classificationInformation, pageNumber
//NOTE: Page Number is an optional parameter
//NOTE: Method layout is as follows (Larger Scope -> Smaller Scope)
/* Constructor,
   get agencies,
   get states,
   get regions,
   get police employment,
   get victims,
   get offenders,
   get crime frequencies,
   get detailed crime stats (ORI and arson only),
   get UCR participation,
   get crime estimates
*/

//TODO: Add custom functionalities?
//TODO: Maybe add checks to see if parameter types are correct? (numbers, etc)


/* ALL METHODS RETURN PROMISES, THE RETURN TYPES ARE AFTER THE PROMISES HAVE BEEN RESOLVED */

const NATIONAL_SCOPE = "national";
const REGIONAL_SCOPE = "regions";
const STATE_SCOPE = "states";
const ORI_SCOPE = "agencies";

class FBI_Wrapper {

  /**
   * Creates a new FBI_Wrapper object, which is used to more easily access the FBI UCR API.
   * @param {String}  userAPIkey                 The api.data.gov API key, which is required to access the FBI UCR API. API Keys can be generated here: https://api.data.gov/signup/
   * @param {Boolean} [strictErrorChecking=true] Indicates whether or not the wrapper should check for potential errors, such as a mismatch in the number of parameters passed to a method.
   */
  constructor(userAPIkey, strictErrorChecking = true) {
    this.request = new RequestCreator(userAPIkey, strictErrorChecking);
  }

  //Get agencies

  /**
   * Gets information about all agencies in the United States.
   * @return {Object} Information about each agency in the U.S, subdivided into states that are further subdivided into agency objects (identified by their ORI-9 (Department Originating Agency Identifier Number, character length 9)).
   */
  getAgencies() {
    this.request.checkParameters(arguments.length, this.getAgencies);
    return this.request.getAgencies();
  }

  /**
   * Gets information about all agencies in a given state
   * @param  {String} stateAbbreviation State abbreviation
   * @param  {Number} [pageNumber=0]    For states with many agencies, data is delivered in multiple "pages", as indicated by the pagination property/object in the returned object. This property allows you to select which page of results you want (Pages are 0-indexed).
   * @return {Object}                   Information about each agency in a given state.
   */
  getAgenciesByState(stateAbbreviation, pageNumber = 0) {
    return this.request.getAgencies("state", stateAbbreviation, pageNumber);
  }

  /**
   * Gets information about a specific agency, as identified by the provided ORI-9.
   * If no ORI is provided, then gets information about all agencies in the United States.
   * @param  {String} [ori=""] The ORI of the desired agency.
   * @return {Object}          Information about the desired agency, or if no ORI is provided, information about each agency in the U.S.
   */
  getAgencyByORI(ori = "") {
    return this.request.getAgencies("ori", ori);
  }

  //Get states

  /**
   * Gets identifying information about all the states in the U.S, such as their ID, abbreviation, and region.
   * @param  {Number} [pageNumber=0] Denotes a specific page of results to view, as indicated by the pagination property/object. Each call only returns 20 states at a time.
   * @return {Object}                Information about (20) states.
   */
  getStates(pageNumber = 0) {
    return this.request.getStates("", pageNumber);
  }

  /**
   * Gets identifying information about a specific state based on its abbreviation.
   * @param  {String} stateAbbreviation State abbreviation (two characters long, like TX).
   * @return {Object}                   Identifying information about that state.
   */
  getStateByAbbreviation(stateAbbreviation) {
    this.request.checkParameters(arguments.length, this.getStateByAbbreviation);
    return this.request.getStates(stateAbbreviation);
  }

  //Get regions

  /**
   * Gets identifying information about all the regions in the U.S
   * @return {Array} Information about all regions in the U.S
   */
  getRegions() {
    this.request.checkParameters(arguments.length, this.getRegions);
    return this.request.getRegions();
  }

  /**
   * Gets identifying information about a specific region based on its name or numerical code.
   * @param  {Number|String} regionName This region's numerical code. Note that this parameter can also be a String (the region's name).
   * @return {Object}                   Information about that specific region.
   */
  getRegionsByName(regionName) {
    this.request.checkParameters(arguments.length, this.getRegionsByName);
    if (typeof regionName == "number") {
      regionName = this.request.convertRegionNumberToRegionName(regionName);
    }
    return this.request.getRegions(regionName);
  }

  //Get police employment statistics

  /**
   * Gets nationwide police employment statistics for each year (up to 1960).
   * @return {Array} Nationwide police employment statistics for each year
   */
  getPoliceByNation() {
    this.request.checkParameters(arguments.length, this.getPoliceByNation);
    return this.request.getPoliceEmployment();
  }

  /**
   * Gets regionwide police employment statistics for each year (up to 1960).
   * @param  {Number|String} regionName This region's numerical code. Note that this parameter can also be a String (the region's name).
   * @return {Array}                    Regionwide police employment statistics for each year
   */
  getPoliceByRegion(regionName) {
    this.request.checkParameters(arguments.length, this.getPoliceByRegion);
    if (typeof regionName == "number") {
      regionName = this.request.convertRegionNumberToRegionName(regionName);
    }
    return this.request.getPoliceEmployment(REGIONAL_SCOPE, regionName);
  }

  /**
   * Gets statewide police employment statistics for each year (up to 1960).
   * @param  {String} stateAbbreviation State Abbreviation, two characters long
   * @return {Array}                    Statewide police employment statistics for each year
   */
  getPoliceByState(stateAbbreviation) {
    this.request.checkParameters(arguments.length, this.getPoliceByState);
    return this.request.getPoliceEmployment(STATE_SCOPE, stateAbbreviation);
  }

  /**
   * Get police employment statistics for a certain agency (hypothetically up the 1960, but many agencies didn't start recording information until later).
   * @param  {String} ori The ORI of the desired agency.
   * @return {Array}      Agency police employment statistics for each year, in addition to other details about the agency (such as the population that year of the served area).
   */
  getPoliceByORI(ori) {
    this.request.checkParameters(arguments.length, this.getPoliceByORI);
    return this.request.getPoliceEmployment(ORI_SCOPE, ori);
  }

  //Get victim demographic statistics

  /**
   * Given a specific offense and a classification criteria for the victims, returns for each year the number of victims (of said offense) that fall into each category of the classification criteria.
   * This method encompasses nation-wide data.
   * Possible offenses are: "violent_crime", "homicide", "rape-legacy", "rape-revised", "robbery", "aggravated-assault", "property-crime", "burglary", "larceny", "motor-vehicle-theft", and "arson".
   * Possible classifications are: "age", "count", "ethnicity", "race", and "sex".
   * Note that entries are not guaranteed to be in any order, and also be aware that for some years, not all agencies reported data, so data might be skewed from before 2005.
   * @param  {String} offense        The offense to find victims of.
   * @param  {String} classification The classification criteria by which the victims will be categorized.
   * @return {Object}                Entries for each year containing the # of (nation-wide victims of the given offense) in each category type.
   */
  getVictimsByNation(offense, classification) {
    this.request.checkParameters(arguments.length, this.getVictimsByNation);
    return this.request.getParticipants("victim", NATIONAL_SCOPE, offense, classification);
  }

  /**
   * Given a specific offense and a classification criteria for the victims, returns for each year the number of victims (of said offense) that fall into each category of the classification criteria.
   * This method encompasses region-wide data.
   * Additional information can be found under method getVictimsByNation
   * @param  {Number|String} regionName     This region's numerical code. Note that this parameter can also be a String (the region's name).
   * @param  {String} offense               The offense to find victims of.
   * @param  {String} classification        The classification criteria by which the victims will be categorized.
   * @return {Object}                       Entries for each year containing the # of (region-wide victims of the given offense) in each category type.
   */
  getVictimsByRegion(regionName, offense, classification) {
    this.request.checkParameters(arguments.length, this.getVictimsByRegion);
    if (typeof regionName == "number") {
      regionName = this.request.convertRegionNumberToRegionName(regionName);
    }
    return this.request.getParticipants("victim", REGIONAL_SCOPE, offense, classification, regionName);
  }

  /**
   * Given a specific offense and a classification criteria for the victims, returns for each year the number of victims (of said offense) that fall into each category of the classification criteria.
   * This method encompasses state-wide data.
   * Additional information can be found under method getVictimsByNation
   * @param  {String} stateAbbreviation State Abbreviation, two characters long
   * @param  {String} offense           The offense to find victims of.
   * @param  {String} classification    The classification criteria by which the victims will be categorized.
   * @return {Object}                   Entries for each year containing the # of (state-wide victims of the given offense) in each category type.
   */
  getVictimsByState(stateAbbreviation, offense, classification) {
    this.request.checkParameters(arguments.length, this.getVictimsByState);
    return this.request.getParticipants("victim", STATE_SCOPE, offense, classification, stateAbbreviation)
  }

  /**
   * Given a specific offense and a classification criteria for the victims, returns for each year the number of victims (of said offense) that fall into each category of the classification criteria.
   * This method encompasses agency-wide data.
   * Additional information can be found under method getVictimsByNation
   * @param  {String} ori            The ORI of the agency in question
   * @param  {String} offense        The offense to find victims of.
   * @param  {String} classification The classification criteria by which the victims will be categorized.
   * @return {Object}                Entries for each year containing the # of (agency-wide victims of the given offense) in each category type.
   */
  getVictimsByORI(ori, offense, classification) {
    this.request.checkParameters(arguments.length, this.getVictimsByORI);
    return this.request.getParticipants("victim", ORI_SCOPE, offense, classification, ori);
  }

  //Get offender demographic statistics

  /**
   * Given a specific offense and a classification criteria for the offenders, returns for each year the number of offenders (who committed said offense) that fall into each category of the classification criteria.
   * This method encompasses nation-wide data.
   * Additional information can be found under method getVictimsByNation
   * @param  {String} offense        The offense for which to find offenders.
   * @param  {String} classification The classification criteria by which the offenders will be categorized.
   * @return {Object}                Entries for each year containing the # of (nation-wide offenders who committed the given offense) in each category type.
   */
  getOffendersByNation(offense, classification) {
    this.request.checkParameters(arguments.length, this.getOffendersByNation);
    return this.request.getParticipants("offender", NATIONAL_SCOPE, offense, classification);
  }

  /**
   * Given a specific offense and a classification criteria for the offenders, returns for each year the number of offenders (who committed said offense) that fall into each category of the classification criteria.
   * This method encompasses region-wide data.
   * Additional information can be found under method getVictimsByNation
   * @param  {Number|String} regionName     This region's numerical code. Note that this parameter can also be a String (the region's name).
   * @param  {String} offense               The offense for which to find offenders.
   * @param  {String} classification        The classification criteria by which the offenders will be categorized.
   * @return {Object}                       Entries for each year containing the # of (region-wide offenders who committed the given offense) in each category type.
   */
  getOffendersByRegion(regionName, offense, classification) {
    this.request.checkParameters(arguments.length, this.getOffendersByRegion);
    if (typeof regionName == "number") {
      regionName = this.request.convertRegionNumberToRegionName(regionName);
    }
    return this.request.getParticipants("offender", REGIONAL_SCOPE, offense, classification, regionName);
  }

  /**
   * Given a specific offense and a classification criteria for the offenders, returns for each year the number of offenders (who committed said offense) that fall into each category of the classification criteria.
   * This method encompasses state-wide data.
   * Additional information can be found under method getVictimsByNation
   * @param  {String} stateAbbreviation State Abbreviation, two characters long
   * @param  {String} offense           The offense for which to find offenders.
   * @param  {String} classification    The classification criteria by which the offenders will be categorized.
   * @return {Object}                   Entries for each year containing the # of (state-wide offenders who committed the given offense) in each category type.
   */
  getOffendersByState(stateAbbreviation, offense, classification) {
    this.request.checkParameters(arguments.length, this.getOffendersByState);
    return this.request.getParticipants("offender", STATE_SCOPE, offense, classification, stateAbbreviation)
  }

  /**
   * Given a specific offense and a classification criteria for the offenders, returns for each year the number of offenders (who committed said offense) that fall into each category of the classification criteria.
   * This method encompasses agency-wide data.
   * Additional information can be found under method getVictimsByNation
   * @param  {String} ori            The ORI of the agency in question
   * @param  {String} offense        The offense for which to find offenders.
   * @param  {String} classification The classification criteria by which the offenders will be categorized.
   * @return {Object}                Entries for each year containing the # of (agency-wide offenders who committed the given offense) in each category type.
   */
  getOffendersByORI(ori, offense, classification) {
    this.request.checkParameters(arguments.length, this.getOffendersByORI);
    return this.request.getParticipants("offender", ORI_SCOPE, offense, classification, ori);
  }

  //Get crime frequency statistics

  /**
   * Given a specific offense, returns for each year the number of incidents and (offense occurrences) that occurred involving that offense.
   * Note that the difference between an incident and an offense is that within an incident, a person could have committed multiple offenses.
   * This method encompasses nation-wide data.
   * Additional information can be found under method getVictimsByNation
   * @param  {String} offense The offense for which to find the # of incidents and occurrences.
   * @return {Array}          Entries for each year containing the # of incidents and (offense occurrences) involving the given offense
   */
  getCrimeCountByNation(offense) {
    this.request.checkParameters(arguments.length, this.getCrimeCountByNation);
    return this.request.getCrimeCount(NATIONAL_SCOPE, offense);
  }

  /**
   * Given a specific offense, returns for each year the number of incidents and (offense occurrences) that occurred involving that offense.
   * This method encompasses region-wide data.
   * Additional information can be found under method getCrimeCountByNation
   * @param  {Number|String} regionName This region's numerical code. Note that this parameter can also be a String (the region's name).
   * @param  {String}        offense    The offense for which to find the # of incidents and occurrences.
   * @return {Array}                    Entries for each year containing the # of incidents and (offense occurrences) involving the given offense
   */
  getCrimeCountByRegion(regionName, offense) {
    this.request.checkParameters(arguments.length, this.getCrimeCountByRegion);
    if (typeof regionName == "number") {
      regionName = this.request.convertRegionNumberToRegionName(regionName);
    }
    return this.request.getCrimeCount(REGIONAL_SCOPE, offense, regionName);
  }

  /**
   * Given a specific offense, returns for each year the number of incidents and (offense occurrences) that occurred involving that offense.
   * This method encompasses state-wide data.
   * Additional information can be found under method getCrimeCountByNation
   * @param  {String} stateAbbreviation State Abbreviation, two characters long
   * @param  {String} offense           The offense for which to find the # of incidents and occurrences.
   * @return {Array}                    Entries for each year containing the # of incidents and (offense occurrences) involving the given offense
   */
  getCrimeCountByState(stateAbbreviation, offense) {
    this.request.checkParameters(arguments.length, this.getCrimeCountByState);
    return this.request.getCrimeCount(STATE_SCOPE, offense, stateAbbreviation);
  }

  /**
   * Given a specific offense, returns for each year the number of incidents and (offense occurrences) that occurred involving that offense.
   * This method encompasses agency-wide data.
   * Additional information can be found under method getCrimeCountByNation
   * @param  {String} ori     The ORI of the agency in question
   * @param  {String} offense The offense for which to find offenders.
   * @return {Array}          Entries for each year containing the # of incidents and (offense occurrences) involving the given offense
   */
  getCrimeCountByORI(ori, offense) {
    this.request.checkParameters(arguments.length, this.getCrimeCountByORI);
    return this.request.getCrimeCount(ORI_SCOPE, offense, ori);
  }

  /**
   * Get detailed statistics about the offenses committed within the jurisdiction of a particular agency.
   * If no one type of offense is specified, then this method returns statistics about all types of offenses.
   * @param  {String} ori                  The ORI of the agency in question
   * @param  {String} [offense="offenses"] The offense for which to find statistics. If no offense is specified, then get statistics about all offenses.
   * @return {Array}                       Entries for each year containing detailed statistics about (each offense).
   */
  getCrimesByORI(ori, offense = "offenses") {
    return this.request.getCrimeSummary(ori, offense);
  }

  //Get detailed arson statistics

  /**
   * For each year, gets detailed statistics about arson, including the # of reports and estimated property damage.
   * This method encompasses nation-wide data.
   * @return {Array} Entries for each year detailing arson statistics
   */
  getDetailedArsonStatsByNation() {
    this.request.checkParameters(arguments.length, this.getDetailedArsonStatsByNation);
    return this.request.getArsonStats(NATIONAL_SCOPE);
  }

  /**
   * For each year, gets detailed statistics about arson, including the # of reports and estimated property damage.
   * Note that this method separates its statistics into states, providing individual arson statistics for each state within the region.
   * This method encompasses region-wide data.
   * @param  {Number|String} regionName This region's numerical code. Note that this parameter can also be a String (the region's name).
   * @return {Array}                    Entries for each year detailing arson statistics.
   */
  getDetailedArsonStatsByRegion(regionName) {
    this.request.checkParameters(arguments.length, this.getDetailedArsonStatsByRegion);
    if (typeof regionName == "number") {
      regionName = this.request.convertRegionNumberToRegionName(regionName);
    }
    return this.request.getArsonStats(REGIONAL_SCOPE, regionName);
  }

  /**
   * For each year, gets detailed statistics about arson, including the # of reports and estimated property damage.
   * This method encompasses state-wide data.
   * @param  {String} stateAbbreviation State Abbreviation, two characters long
   * @return {Array}                    Entries for each year detailing arson statistics.
   */
  getDetailedArsonStatsByState(stateAbbreviation) {
    this.request.checkParameters(arguments.length, this.getDetailedArsonStatsByState);
    return this.request.getArsonStats(STATE_SCOPE, stateAbbreviation);
  }

  //Get participation statistics (with UCR)

  /**
   * For each year, returns the total number of agencies in the U.S in addition to what type of data they submit (SRS, NIBRS).
   * SRS is the old hierarchical crime reporting system (Summary Reporting System) that only collects a limited range of data.
   * NIBRS is the new system (National Incident-Based Reporting System) that allows for more extensive data collection (more crime categories).
   * @return {Array} Entries for each year detailing the number of agencies and how many collect what type of information
   */
  getParticipationByNation() {
    this.request.checkParameters(arguments.length, this.getParticipationByNation);
    return this.request.getAgencyParticipation(NATIONAL_SCOPE);
  }

  /**
   * For each year, returns the total number of agencies in the specified region in addition to what type of data they submit (SRS, NIBRS).
   * @param  {Number|String} regionName This region's numerical code. Note that this parameter can also be a String (the region's name).
   * @return {Array}                    Entries for each year detailing the number of agencies and how many collect what type of information
   */
  getParticipationByRegion(regionName) {
    this.request.checkParameters(arguments.length, this.getParticipationByRegion);
    if (typeof regionName == "number") {
      regionName = this.request.convertRegionNumberToRegionName(regionName);
    }
    return this.request.getAgencyParticipation(REGIONAL_SCOPE, regionName);
  }

  /**
   * For each year, returns the total number of agencies in the specified state in addition to what type of data they submit (SRS, NIBRS).
   * @param  {String} stateAbbreviation State Abbreviation, two characters long
   * @return {Array}                    Entries for each year detailing the number of agencies and how many collect what type of information
   */
  getParticipationByState(stateAbbreviation) {
    this.request.checkParameters(arguments.length, this.getParticipationByState);
    return this.request.getAgencyParticipation(STATE_SCOPE, stateAbbreviation);
  }

  /**
   * For each year, returns the type of data that this specific agency has been reporting, in addition to other relevant data about the agency.
   * @param  {String} ori The ORI of the agency in question
   * @return {Array}      Entries for each year detailing the number of agencies and how many collect what type of information
   */
  getParticipationByORI(ori) {
    this.request.checkParameters(arguments.length, this.getParticipationByORI);
    return this.request.getAgencyParticipation(ORI_SCOPE, ori)
  }

  //Get crime estimates

  /**
   * For each year, returns the estimated number of crimes (in different categories) that occurred.
   * This method encompasses nation-wide data.
   * @return {Array} Entries for each year detailing the estimated number of crimes that occurred.
   */
  getCrimeEstimatesByNation() {
    this.request.checkParameters(arguments.length, this.getCrimeEstimatesByNation);
    return this.request.getEstimates(NATIONAL_SCOPE);
  }

  /**
   * For each year, returns the estimated number of crimes (in different categories) that occurred.
   * Note that this method breaks down its statistics into states, providing estimates for each state within the region.
   * This method encompasses region-wide data.
   * @param  {Number|String} regionName This region's numerical code. Note that this parameter can also be a String (the region's name).
   * @return {Array}                    Entries for each year detailing the estimated number of crimes that occurred.
   */
  getCrimeEstimatesByRegion(regionName) {
    this.request.checkParameters(arguments.length, this.getCrimeEstimatesByRegion);
    if (typeof regionName == "number") {
      regionName = this.request.convertRegionNumberToRegionName(regionName);
    }
    return this.request.getEstimates(REGIONAL_SCOPE, regionName);
  }

  /**
   * For each year, returns the estimated number of crimes (in different categories) that occurred.
   * This method encompasses state-wide data.
   * @param  {String} stateAbbreviation State Abbreviation, two characters long
   * @return {Array}                    Entries for each year detailing the estimated number of crimes that occurred.
   */
  getCrimeEstimatesByState(stateAbbreviation) {
    this.request.checkParameters(arguments.length, this.getCrimeEstimatesByState);
    return this.request.getEstimates(STATE_SCOPE, stateAbbreviation);
  }

}

module.exports = FBI_Wrapper;
