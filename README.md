Minimalist FBI Crime Data API Wrapper, meant primarily for personal use with a future project, but shared publicly so that others can also use it.

Fulfills most if not all of the functionality found here: <https://crime-data-explorer.fr.cloud.gov/api>
Also extends some additional functionality that might be helpful.

Do not expect maintenance.

<!--
TODO LIST:
(x) Complete all default methods
(x) Document all default methods
(x) Change return types (from Promise -> Object to Promise -> Array for that which can be isolated)
( ) Come up with extra methods that extend functionality
( ) Document all methods
( ) Write examples for all methods
( ) Write test cases for all methods (try mocha?)
( ) Publish and use in React Native app
-->

## API_DOCUMENTATION

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [constructor](#constructor)
    -   [Parameters](#parameters)
-   [getAgencies](#getagencies)
-   [getAgenciesByState](#getagenciesbystate)
    -   [Parameters](#parameters-1)
-   [getAgencyByORI](#getagencybyori)
    -   [Parameters](#parameters-2)
-   [getStates](#getstates)
    -   [Parameters](#parameters-3)
-   [getStateByAbbreviation](#getstatebyabbreviation)
    -   [Parameters](#parameters-4)
-   [getRegions](#getregions)
-   [getRegionsByName](#getregionsbyname)
    -   [Parameters](#parameters-5)
-   [getPoliceByNation](#getpolicebynation)
-   [getPoliceByRegion](#getpolicebyregion)
    -   [Parameters](#parameters-6)
-   [getPoliceByState](#getpolicebystate)
    -   [Parameters](#parameters-7)
-   [getPoliceByORI](#getpolicebyori)
    -   [Parameters](#parameters-8)
-   [getVictimsByNation](#getvictimsbynation)
    -   [Parameters](#parameters-9)
-   [getVictimsByRegion](#getvictimsbyregion)
    -   [Parameters](#parameters-10)
-   [getVictimsByState](#getvictimsbystate)
    -   [Parameters](#parameters-11)
-   [getVictimsByORI](#getvictimsbyori)
    -   [Parameters](#parameters-12)
-   [getOffendersByNation](#getoffendersbynation)
    -   [Parameters](#parameters-13)
-   [getOffendersByRegion](#getoffendersbyregion)
    -   [Parameters](#parameters-14)
-   [getOffendersByState](#getoffendersbystate)
    -   [Parameters](#parameters-15)
-   [getOffendersByORI](#getoffendersbyori)
    -   [Parameters](#parameters-16)
-   [getCrimeCountByNation](#getcrimecountbynation)
    -   [Parameters](#parameters-17)
-   [getCrimeCountByRegion](#getcrimecountbyregion)
    -   [Parameters](#parameters-18)
-   [getCrimeCountByState](#getcrimecountbystate)
    -   [Parameters](#parameters-19)
-   [getCrimeCountByORI](#getcrimecountbyori)
    -   [Parameters](#parameters-20)
-   [getCrimesByORI](#getcrimesbyori)
    -   [Parameters](#parameters-21)
-   [getDetailedArsonStatsByNation](#getdetailedarsonstatsbynation)
-   [getDetailedArsonStatsByRegion](#getdetailedarsonstatsbyregion)
    -   [Parameters](#parameters-22)
-   [getDetailedArsonStatsByState](#getdetailedarsonstatsbystate)
    -   [Parameters](#parameters-23)
-   [getParticipationByNation](#getparticipationbynation)
-   [getParticipationByRegion](#getparticipationbyregion)
    -   [Parameters](#parameters-24)
-   [getParticipationByState](#getparticipationbystate)
    -   [Parameters](#parameters-25)
-   [getParticipationByORI](#getparticipationbyori)
    -   [Parameters](#parameters-26)
-   [getCrimeEstimatesByNation](#getcrimeestimatesbynation)
-   [getCrimeEstimatesByRegion](#getcrimeestimatesbyregion)
    -   [Parameters](#parameters-27)
-   [getCrimeEstimatesByState](#getcrimeestimatesbystate)
    -   [Parameters](#parameters-28)

### constructor

Creates a new FBI_Wrapper object, which is used to more easily access the FBI UCR API.

#### Parameters

-   `userAPIkey` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The api.data.gov API key, which is required to access the FBI UCR API. API Keys can be generated here: <https://api.data.gov/signup/>
-   `strictErrorChecking` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Indicates whether or not the wrapper should check for potential errors, such as a mismatch in the number of parameters passed to a method. (optional, default `true`)

### getAgencies

Gets information about all agencies in the United States.

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Information about each agency in the U.S, subdivided into states that are further subdivided into agency objects (identified by their ORI-9 (Department Originating Agency Identifier Number, character length 9)).

### getAgenciesByState

Gets information about all agencies in a given state

#### Parameters

-   `stateAbbreviation` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** State abbreviation
-   `pageNumber` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** For states with many agencies, data is delivered in multiple "pages", as indicated by the pagination property/object in the returned object. This property allows you to select which page of results you want (Pages are 0-indexed). (optional, default `0`)

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Information about each agency in a given state.

### getAgencyByORI

Gets information about a specific agency, as identified by the provided ORI-9.
If no ORI is provided, then gets information about all agencies in the United States.

#### Parameters

-   `ori` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ORI of the desired agency. (optional, default `""`)

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Information about the desired agency, or if no ORI is provided, information about each agency in the U.S.

### getStates

Gets identifying information about all the states in the U.S, such as their ID, abbreviation, and region.

#### Parameters

-   `pageNumber` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Denotes a specific page of results to view, as indicated by the pagination property/object. Each call only returns 20 states at a time. (optional, default `0`)

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Information about (20) states.

### getStateByAbbreviation

Gets identifying information about a specific state based on its abbreviation.

#### Parameters

-   `stateAbbreviation` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** State abbreviation (two characters long, like TX).

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Identifying information about that state.

### getRegions

Gets identifying information about all the regions in the U.S

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Information about all regions in the U.S

### getRegionsByName

Gets identifying information about a specific region based on its name or numerical code.

#### Parameters

-   `regionName` **([Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** This region's numerical code. Note that this parameter can also be a String (the region's name).

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Information about that specific region.

### getPoliceByNation

Gets nationwide police employment statistics for each year (up to 1960).

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Nationwide police employment statistics for each year

### getPoliceByRegion

Gets regionwide police employment statistics for each year (up to 1960).

#### Parameters

-   `regionName` **([Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** This region's numerical code. Note that this parameter can also be a String (the region's name).

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Regionwide police employment statistics for each year

### getPoliceByState

Gets statewide police employment statistics for each year (up to 1960).

#### Parameters

-   `stateAbbreviation` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** State Abbreviation, two characters long

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Statewide police employment statistics for each year

### getPoliceByORI

Get police employment statistics for a certain agency (hypothetically up the 1960, but many agencies didn't start recording information until later).

#### Parameters

-   `ori` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ORI of the desired agency.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Agency police employment statistics for each year, in addition to other details about the agency (such as the population that year of the served area).

### getVictimsByNation

Given a specific offense and a classification criteria for the victims, returns for each year the number of victims (of said offense) that fall into each category of the classification criteria.
This method encompasses nation-wide data.
Possible offenses are: "violent_crime", "homicide", "rape-legacy", "rape-revised", "robbery", "aggravated-assault", "property-crime", "burglary", "larceny", "motor-vehicle-theft", and "arson".
Possible classifications are: "age", "count", "ethnicity", "race", and "sex".
Note that entries are not guaranteed to be in any order, and also be aware that for some years, not all agencies reported data, so data might be skewed from before 2005.

#### Parameters

-   `offense` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The offense to find victims of.
-   `classification` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The classification criteria by which the victims will be categorized.

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Entries for each year containing the # of (nation-wide victims of the given offense) in each category type.

### getVictimsByRegion

Given a specific offense and a classification criteria for the victims, returns for each year the number of victims (of said offense) that fall into each category of the classification criteria.
This method encompasses region-wide data.
Additional information can be found under method getVictimsByNation

#### Parameters

-   `regionName` **([Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** This region's numerical code. Note that this parameter can also be a String (the region's name).
-   `offense` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The offense to find victims of.
-   `classification` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The classification criteria by which the victims will be categorized.

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Entries for each year containing the # of (region-wide victims of the given offense) in each category type.

### getVictimsByState

Given a specific offense and a classification criteria for the victims, returns for each year the number of victims (of said offense) that fall into each category of the classification criteria.
This method encompasses state-wide data.
Additional information can be found under method getVictimsByNation

#### Parameters

-   `stateAbbreviation` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** State Abbreviation, two characters long
-   `offense` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The offense to find victims of.
-   `classification` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The classification criteria by which the victims will be categorized.

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Entries for each year containing the # of (state-wide victims of the given offense) in each category type.

### getVictimsByORI

Given a specific offense and a classification criteria for the victims, returns for each year the number of victims (of said offense) that fall into each category of the classification criteria.
This method encompasses agency-wide data.
Additional information can be found under method getVictimsByNation

#### Parameters

-   `ori` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ORI of the agency in question
-   `offense` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The offense to find victims of.
-   `classification` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The classification criteria by which the victims will be categorized.

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Entries for each year containing the # of (agency-wide victims of the given offense) in each category type.

### getOffendersByNation

Given a specific offense and a classification criteria for the offenders, returns for each year the number of offenders (who committed said offense) that fall into each category of the classification criteria.
This method encompasses nation-wide data.
Additional information can be found under method getVictimsByNation

#### Parameters

-   `offense` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The offense for which to find offenders.
-   `classification` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The classification criteria by which the offenders will be categorized.

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Entries for each year containing the # of (nation-wide offenders who committed the given offense) in each category type.

### getOffendersByRegion

Given a specific offense and a classification criteria for the offenders, returns for each year the number of offenders (who committed said offense) that fall into each category of the classification criteria.
This method encompasses region-wide data.
Additional information can be found under method getVictimsByNation

#### Parameters

-   `regionName` **([Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** This region's numerical code. Note that this parameter can also be a String (the region's name).
-   `offense` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The offense for which to find offenders.
-   `classification` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The classification criteria by which the offenders will be categorized.

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Entries for each year containing the # of (region-wide offenders who committed the given offense) in each category type.

### getOffendersByState

Given a specific offense and a classification criteria for the offenders, returns for each year the number of offenders (who committed said offense) that fall into each category of the classification criteria.
This method encompasses state-wide data.
Additional information can be found under method getVictimsByNation

#### Parameters

-   `stateAbbreviation` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** State Abbreviation, two characters long
-   `offense` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The offense for which to find offenders.
-   `classification` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The classification criteria by which the offenders will be categorized.

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Entries for each year containing the # of (state-wide offenders who committed the given offense) in each category type.

### getOffendersByORI

Given a specific offense and a classification criteria for the offenders, returns for each year the number of offenders (who committed said offense) that fall into each category of the classification criteria.
This method encompasses agency-wide data.
Additional information can be found under method getVictimsByNation

#### Parameters

-   `ori` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ORI of the agency in question
-   `offense` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The offense for which to find offenders.
-   `classification` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The classification criteria by which the offenders will be categorized.

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Entries for each year containing the # of (agency-wide offenders who committed the given offense) in each category type.

### getCrimeCountByNation

Given a specific offense, returns for each year the number of incidents and (offense occurrences) that occurred involving that offense.
Note that the difference between an incident and an offense is that within an incident, a person could have committed multiple offenses.
This method encompasses nation-wide data.
Additional information can be found under method getVictimsByNation

#### Parameters

-   `offense` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The offense for which to find the # of incidents and occurrences.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year containing the # of incidents and (offense occurrences) involving the given offense

### getCrimeCountByRegion

Given a specific offense, returns for each year the number of incidents and (offense occurrences) that occurred involving that offense.
This method encompasses region-wide data.
Additional information can be found under method getCrimeCountByNation

#### Parameters

-   `regionName` **([Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** This region's numerical code. Note that this parameter can also be a String (the region's name).
-   `offense` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The offense for which to find the # of incidents and occurrences.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year containing the # of incidents and (offense occurrences) involving the given offense

### getCrimeCountByState

Given a specific offense, returns for each year the number of incidents and (offense occurrences) that occurred involving that offense.
This method encompasses state-wide data.
Additional information can be found under method getCrimeCountByNation

#### Parameters

-   `stateAbbreviation` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** State Abbreviation, two characters long
-   `offense` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The offense for which to find the # of incidents and occurrences.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year containing the # of incidents and (offense occurrences) involving the given offense

### getCrimeCountByORI

Given a specific offense, returns for each year the number of incidents and (offense occurrences) that occurred involving that offense.
This method encompasses agency-wide data.
Additional information can be found under method getCrimeCountByNation

#### Parameters

-   `ori` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ORI of the agency in question
-   `offense` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The offense for which to find offenders.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year containing the # of incidents and (offense occurrences) involving the given offense

### getCrimesByORI

Get detailed statistics about the offenses committed within the jurisdiction of a particular agency.
If no one type of offense is specified, then this method returns statistics about all types of offenses.

#### Parameters

-   `ori` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ORI of the agency in question
-   `offense` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The offense for which to find statistics. If no offense is specified, then get statistics about all offenses. (optional, default `"offenses"`)

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year containing detailed statistics about (each offense).

### getDetailedArsonStatsByNation

For each year, gets detailed statistics about arson, including the # of reports and estimated property damage.
This method encompasses nation-wide data.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year detailing arson statistics

### getDetailedArsonStatsByRegion

For each year, gets detailed statistics about arson, including the # of reports and estimated property damage.
Note that this method separates its statistics into states, providing individual arson statistics for each state within the region.
This method encompasses region-wide data.

#### Parameters

-   `regionName` **([Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** This region's numerical code. Note that this parameter can also be a String (the region's name).

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year detailing arson statistics.

### getDetailedArsonStatsByState

For each year, gets detailed statistics about arson, including the # of reports and estimated property damage.
This method encompasses state-wide data.

#### Parameters

-   `stateAbbreviation` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** State Abbreviation, two characters long

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year detailing arson statistics.

### getParticipationByNation

For each year, returns the total number of agencies in the U.S in addition to what type of data they submit (SRS, NIBRS).
SRS is the old hierarchical crime reporting system (Summary Reporting System) that only collects a limited range of data.
NIBRS is the new system (National Incident-Based Reporting System) that allows for more extensive data collection (more crime categories).

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year detailing the number of agencies and how many collect what type of information

### getParticipationByRegion

For each year, returns the total number of agencies in the specified region in addition to what type of data they submit (SRS, NIBRS).

#### Parameters

-   `regionName` **([Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** This region's numerical code. Note that this parameter can also be a String (the region's name).

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year detailing the number of agencies and how many collect what type of information

### getParticipationByState

For each year, returns the total number of agencies in the specified state in addition to what type of data they submit (SRS, NIBRS).

#### Parameters

-   `stateAbbreviation` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** State Abbreviation, two characters long

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year detailing the number of agencies and how many collect what type of information

### getParticipationByORI

For each year, returns the type of data that this specific agency has been reporting, in addition to other relevant data about the agency.

#### Parameters

-   `ori` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ORI of the agency in question

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year detailing the number of agencies and how many collect what type of information

### getCrimeEstimatesByNation

For each year, returns the estimated number of crimes (in different categories) that occurred.
This method encompasses nation-wide data.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year detailing the estimated number of crimes that occurred.

### getCrimeEstimatesByRegion

For each year, returns the estimated number of crimes (in different categories) that occurred.
Note that this method breaks down its statistics into states, providing estimates for each state within the region.
This method encompasses region-wide data.

#### Parameters

-   `regionName` **([Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** This region's numerical code. Note that this parameter can also be a String (the region's name).

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year detailing the estimated number of crimes that occurred.

### getCrimeEstimatesByState

For each year, returns the estimated number of crimes (in different categories) that occurred.
This method encompasses state-wide data.

#### Parameters

-   `stateAbbreviation` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** State Abbreviation, two characters long

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Entries for each year detailing the estimated number of crimes that occurred.
