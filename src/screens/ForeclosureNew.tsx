import React, { useState, useEffect } from 'react';
import { useForeclosureStore } from '../store/ForeclosureStore';

const findNumbersAndMakePhoneNumber = (str: string): string => {
  let numbersString = '';

  // go through each character in the string, only add if it is a number
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (char >= '0' && char <= '9') {
      numbersString += char;
    }
  }

  // check if the string is 10 digits long
  if (numbersString.length === 10) {
    // format the string as a phone number
    return `(${numbersString.slice(0, 3)}) ${numbersString.slice(3, 6)}-${numbersString.slice(6)}`;
  } else {
    // if not, return the original string
    return str;
  }
};

const replaceAmpWithAnd = (str: string): string => {
  return str.replace(/&amp;/g, '&');
};

const numberToDollarAmountString = (number: number): string => {
  if (isNaN(number)) return '';

  // don't show cents if it's a whole number
  const formattedNumber = number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  return formattedNumber;
};

type CityDistanceObject = {
  city: string;
  distanceMiles: number;
};

const citiesByDistance: CityDistanceObject[] = [
  { city: 'Greenwich', distanceMiles: 0.0 },
  { city: 'Stamford', distanceMiles: 5.04 },
  { city: 'New Canaan', distanceMiles: 10.84 },
  { city: 'Norwalk', distanceMiles: 13.11 },
  { city: 'Wilton', distanceMiles: 15.33 },
  { city: 'Bridgeport', distanceMiles: 18.53 },
  { city: 'Fairfield', distanceMiles: 18.68 },
  { city: 'Trumbull', distanceMiles: 20.18 },
  { city: 'Redding', distanceMiles: 21.04 },
  { city: 'Monroe', distanceMiles: 21.22 },
  { city: 'Westport', distanceMiles: 21.29 },
  { city: 'Bethel', distanceMiles: 21.53 },
  { city: 'Danbury', distanceMiles: 21.92 },
  { city: 'Milford', distanceMiles: 23.87 },
  { city: 'Derby', distanceMiles: 25.39 },
  { city: 'Seymour', distanceMiles: 26.08 },
  { city: 'Bridgewater', distanceMiles: 26.68 },
  { city: 'Southbury', distanceMiles: 27.3 },
  { city: 'Middlebury', distanceMiles: 28.09 },
  { city: 'Waterbury', distanceMiles: 28.6 },
  { city: 'Newtown', distanceMiles: 29.1 },
  { city: 'Ansonia', distanceMiles: 29.5 },
  { city: 'Stratford', distanceMiles: 30.0 },
  { city: 'New Haven', distanceMiles: 30.6 },
  { city: 'Hamden', distanceMiles: 31.5 },
  { city: 'Naugatuck', distanceMiles: 31.7 },
  { city: 'Cheshire', distanceMiles: 32.1 },
  { city: 'Wallingford', distanceMiles: 34.1 },
  { city: 'Watertown', distanceMiles: 34.6 },
  { city: 'Southington', distanceMiles: 35.7 },
  { city: 'Meriden', distanceMiles: 35.9 },
  { city: 'Wolcott', distanceMiles: 36.0 },
  { city: 'New Britain', distanceMiles: 37.5 },
  { city: 'Plymouth', distanceMiles: 38.3 },
  { city: 'Middletown', distanceMiles: 38.7 },
  { city: 'Bristol', distanceMiles: 39.1 },
  { city: 'Plainville', distanceMiles: 39.4 },
  { city: 'Berlin', distanceMiles: 39.8 },
  { city: 'Durham', distanceMiles: 40.3 },
  { city: 'Farmington', distanceMiles: 40.5 },
  { city: 'Newington', distanceMiles: 41.3 },
  { city: 'Wethersfield', distanceMiles: 42.0 },
  { city: 'Rocky Hill', distanceMiles: 42.3 },
  { city: 'West Hartford', distanceMiles: 42.6 },
  { city: 'Hartford', distanceMiles: 43.0 },
  { city: 'Manchester', distanceMiles: 43.6 },
  { city: 'West Haven', distanceMiles: 43.7 },
  { city: 'East Hartford', distanceMiles: 43.8 },
  { city: 'Canton', distanceMiles: 44.0 },
  { city: 'Burlington', distanceMiles: 44.2 },
  { city: 'Glastonbury', distanceMiles: 44.3 },
  { city: 'New Hartford', distanceMiles: 44.8 },
  { city: 'Simsbury', distanceMiles: 45.3 },
  { city: 'Avon', distanceMiles: 45.6 },
  { city: 'Hebron', distanceMiles: 46.5 },
  { city: 'East Hampton', distanceMiles: 46.8 },
  { city: 'Bloomfield', distanceMiles: 47.1 },
  { city: 'Colchester', distanceMiles: 48.2 },
  { city: 'Montville', distanceMiles: 50.2 },
  { city: 'Lebanon', distanceMiles: 51.3 },
  { city: 'Windham', distanceMiles: 52.1 },
  { city: 'East Haddam', distanceMiles: 52.5 },
  { city: 'Bozrah', distanceMiles: 53.4 },
  { city: 'Mansfield', distanceMiles: 53.5 },
  { city: 'Norwich', distanceMiles: 54.0 },
  { city: 'Waterford', distanceMiles: 55.3 },
  { city: 'New London', distanceMiles: 56.6 },
  { city: 'Plainfield', distanceMiles: 59.1 },
  { city: 'Woodstock', distanceMiles: 60.3 },
  { city: 'Thompson', distanceMiles: 61.7 },
  { city: 'Sprague', distanceMiles: 62.1 },
  { city: 'Stafford', distanceMiles: 63.3 },
  { city: 'Suffield', distanceMiles: 63.9 },
  { city: 'Ellington', distanceMiles: 64.3 },
  { city: 'East Windsor', distanceMiles: 64.6 },
  { city: 'South Windsor', distanceMiles: 65.1 },
  { city: 'Windsor', distanceMiles: 66.0 },
  { city: 'Windsor Locks', distanceMiles: 67.3 },
  { city: 'Enfield', distanceMiles: 68.5 },
];

function capitalizeEachWord(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => {
      // Apply capitalization rule to all words, including those in all caps
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

const ForeclosureNew = () => {
  const {
    cityList,
    selectedCities,
    postings,
    fetchingCities,
    fetchingPostings,
    fetchingDetails,
    error,
    timestamp,
    progress,
    fetchCityList,
    setSelectedCities,
    toggleCitySelection,
    processSelectedCities,
    setError,
    clearPostings,
  } = useForeclosureStore();

  const [distanceFromGreenwich, setDistanceFromGreenwich] = useState<number>(20);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
  const [selectedAuction, setSelectedAuction] = useState<any>(null);
  const [emailCopied, setEmailCopied] = useState<boolean>(false);

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'ascending' | 'descending' | null;
  }>({ key: null, direction: null });

  // Select cities within distance from Greenwich
  const selectCitiesByDistance = (distance: number) => {
    // Find cities that are within the specified distance
    const citiesWithinDistance = citiesByDistance
      .filter((city) => city.distanceMiles <= distance)
      .map((city) => city.city);

    // Filter cityList to only include these cities (because some cities in distance list might not appear in the actual data)
    const availableCitiesWithinDistance = cityList
      .filter((city) => citiesWithinDistance.includes(city.name))
      .map((city) => city.name);

    setSelectedCities(availableCitiesWithinDistance);
  };

  // Update city selection when distance changes
  useEffect(() => {
    if (cityList.length > 0) {
      selectCitiesByDistance(distanceFromGreenwich);
    }
  }, [distanceFromGreenwich, cityList]);

  // Load initial city list on component mount
  useEffect(() => {
    fetchCityList();
  }, []);

  // Format sale date to YYYY-MM-DD HH:MM format
  const formatSaleDate = (params: {
    saleDate?: string;
    saleTime?: string;
    showTime: boolean;
  }): string => {
    // Check if saleDate is provided
    const { saleDate, showTime, saleTime } = params;

    if (!saleDate) return '';

    // Parse the date parts
    // Expected formats: "January 1, 2023" or "Jan. 1, 2023" or similar
    try {
      const dateObj = new Date(saleDate);
      if (isNaN(dateObj.getTime())) return saleDate; // Return original if parsing fails

      // Format the date part as YYYY-MM-DD
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');

      // Format the time part if available
      let formattedTime = '';
      if (showTime && saleTime) {
        // Extract hours and minutes from time string (expected format like "10:00 AM")
        const timeMatch = saleTime.match(/(\d+):(\d+)\s*(AM|PM)?/i);
        if (timeMatch) {
          let hours = parseInt(timeMatch[1], 10);
          const minutes = timeMatch[2];
          const ampm = timeMatch[3]?.toUpperCase();

          // Convert to 24-hour format if AM/PM is specified
          if (ampm === 'PM' && hours < 12) hours += 12;
          if (ampm === 'AM' && hours === 12) hours = 0;

          formattedTime = ` ${String(hours).padStart(2, '0')}:${minutes}`;
        } else {
          formattedTime = ` ${saleTime}`;
        }
      }

      return `${year}-${month}-${day}${formattedTime}`;
    } catch (e) {
      console.error('Error formatting date:', e);
      return saleDate;
    }
  };

  // Sort function for table columns
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';

    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      // If already descending, clear the sort
      return setSortConfig({ key: null, direction: null });
    }

    setSortConfig({ key, direction });
  };

  // Get sorted postings
  const getSortedPostings = () => {
    if (!sortConfig.key || !sortConfig.direction) {
      return postings;
    }

    return [...postings].sort((a, b) => {
      let aValue: any = '';
      let bValue: any = '';

      // Extract values based on sort key
      if (sortConfig.key === 'status') {
        // Special handling for status with cancelled items
        if (a.status === 'loaded' && a.auctionNotice?.status?.toLowerCase().includes('cancel')) {
          aValue = 'cancelled';
        } else {
          aValue = a.status;
        }

        if (b.status === 'loaded' && b.auctionNotice?.status?.toLowerCase().includes('cancel')) {
          bValue = 'cancelled';
        } else {
          bValue = b.status;
        }
      } else if (sortConfig.key === 'city') {
        aValue = a.auctionNotice?.town || a.city || '';
        bValue = b.auctionNotice?.town || b.city || '';
      } else if (sortConfig.key === 'caseCaption') {
        aValue = a.auctionNotice?.caseCaption || '';
        bValue = b.auctionNotice?.caseCaption || '';
      } else if (sortConfig.key === 'saleDate') {
        // For sale date, we want to compare dates in our formatted style
        aValue = formatSaleDate({
          saleDate: a.auctionNotice?.saleDate,
          saleTime: a.auctionNotice?.saleTime,
          showTime: false,
        });
        bValue = formatSaleDate({
          saleDate: b.auctionNotice?.saleDate,
          saleTime: b.auctionNotice?.saleTime,
          showTime: false,
        });
      } else if (sortConfig.key === 'docketNumber') {
        aValue = a.auctionNotice?.docketNumber || '';
        bValue = b.auctionNotice?.docketNumber || '';
      } else if (sortConfig.key === 'address') {
        aValue = a.auctionNotice?.address || '';
        bValue = b.auctionNotice?.address || '';
      } else if (sortConfig.key === 'dollarAmountFound') {
        aValue = a.auctionNotice?.dollarAmountNumber || 0;
        bValue = b.auctionNotice?.dollarAmountNumber || 0;
      } else if (sortConfig.key === 'committeeName') {
        aValue = a.auctionNotice?.committeeName || '';
        bValue = b.auctionNotice?.committeeName || '';
      } else if (sortConfig.key === 'committeePhone') {
        aValue = findNumbersAndMakePhoneNumber(a.auctionNotice?.committeePhone || '');
        bValue = findNumbersAndMakePhoneNumber(b.auctionNotice?.committeePhone || '');
      } else if (sortConfig.key === 'committeeEmail') {
        aValue = (a.auctionNotice?.committeeEmail || '').toLowerCase();
        bValue = (b.auctionNotice?.committeeEmail || '').toLowerCase();
      }

      // Compare the values
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Get sort indicator for column headers
  const getSortIndicator = (key: string) => {
    if (sortConfig.key !== key) {
      return (
        <svg
          className="ml-2 inline-block h-3 w-3 opacity-0 group-hover:opacity-25"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      );
    }

    return sortConfig.direction === 'ascending' ? (
      <svg
        className="ml-2 inline-block h-3.5 w-3.5 text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg
        className="ml-2 inline-block h-3.5 w-3.5 text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  // Calculate statistics
  const getStats = () => {
    const loaded = postings.filter((p) => p.status === 'loaded').length;
    const pending = postings.filter((p) => p.status === 'pending').length;
    const loading = postings.filter((p) => p.status === 'loading').length;
    const error = postings.filter((p) => p.status === 'error').length;
    const cancelled = postings.filter(
      (p) => p.status === 'loaded' && p.auctionNotice?.status?.toLowerCase().includes('cancel')
    ).length;

    return {
      loaded,
      pending,
      loading,
      error,
      cancelled,
      total: postings.length,
    };
  };

  // Function to download table data as CSV
  const downloadTableAsCSV = () => {
    // Filter for loaded postings only
    const loadedPostings = postings.filter((p) => p.status === 'loaded');

    if (loadedPostings.length === 0) {
      setError('No data available to download.');
      return;
    }

    // Define CSV headers
    const headers = [
      'Status',
      'City',
      'Deposit',
      'Address',
      'Committee Name',
      'Committee Phone',
      'Committee Email',
      'Sale Date',
      'Docket Number',
    ];

    // Convert postings to CSV rows
    const rows = loadedPostings.map((posting) => {
      const status = posting.auctionNotice?.status?.toLowerCase().includes('cancel')
        ? 'Cancelled'
        : 'Active';

      const town = posting.auctionNotice?.town || posting.city || '';

      const deposit = numberToDollarAmountString(posting.auctionNotice?.dollarAmountNumber || 0);

      const address = posting.auctionNotice?.address || '';

      const committeeName = posting.auctionNotice?.committeeName || '';

      const committeePhone = findNumbersAndMakePhoneNumber(
        posting.auctionNotice?.committeePhone || ''
      );

      const committeeEmail = posting.auctionNotice?.committeeEmail || '';

      const saleDate = posting.auctionNotice?.saleDate
        ? formatSaleDate({
            saleDate: posting.auctionNotice.saleDate,
            saleTime: posting.auctionNotice.saleTime,
            showTime: true,
          })
        : '';

      const docketNumber = posting.auctionNotice?.docketNumber || '';

      // Escape fields that might contain commas
      const escapeCsvField = (field: string) => {
        if (field.includes(',') || field.includes('"') || field.includes('\n')) {
          return `"${field.replace(/"/g, '""')}"`;
        }
        return field;
      };

      return [
        escapeCsvField(status),
        escapeCsvField(town),
        escapeCsvField(deposit),
        escapeCsvField(address),
        escapeCsvField(committeeName),
        escapeCsvField(committeePhone),
        escapeCsvField(committeeEmail),
        escapeCsvField(saleDate),
        escapeCsvField(docketNumber),
      ].join(',');
    });

    // Combine headers and rows
    const csvContent = [headers.join(','), ...rows].join('\n');

    // Create file and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    // Format current date for filename
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];

    const formattedTime = date.toTimeString().split(' ')[0].replace(/:/g, '-');
    const formattedDateTime = `${formattedDate}_${formattedTime}`;

    link.setAttribute('href', url);
    link.setAttribute('download', `foreclosure-data-${formattedDateTime}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Display status message
  const getStatusMessage = () => {
    if (fetchingCities) {
      return 'Fetching city list...';
    }

    if (fetchingPostings) {
      return `Fetching posting IDs for cities... (${progress.citiesProcessed}/${progress.totalCities})`;
    }

    if (fetchingDetails) {
      return `Fetching auction details... (${progress.completed}/${progress.total})`;
    }

    if (postings.length > 0) {
      const stats = getStats();
      return `Loaded ${stats.loaded} of ${stats.total} auction details (${stats.cancelled} cancelled)`;
    }

    return "Select cities and click 'Process Selected Cities' to fetch foreclosure data.";
  };

  // Generate email template from selected auction
  const generateEmailTemplate = () => {
    if (!selectedAuction) return '';

    const { address, town, saleDate, saleTime, dollarAmountString, docketNumber, committeeName } =
      selectedAuction;

    // Determine the date and time for a clean version
    const formattedSaleDate = formatSaleDate({
      saleDate: saleDate,
      saleTime: saleTime,
      showTime: true,
    });

    const emailText: string = `EMAIL ADDRESS: ${selectedAuction.committeeEmail}
    
Subject: Inquiry about property at ${address}, ${town}


Hi ${capitalizeEachWord(committeeName)},

I hope your week is going well. I am reaching out regarding the property located at ${address}.

Is this auction still on? Would you please send me a note if it gets canceled?
What is the opening bid and the appraised value?
Is it vacant to your knowledge?
Is there anything else important you can share with us at this time?

Thank you.

Kind Regards,

Lela
`;

    return emailText;
  };

  // Copy the email template to clipboard
  const copyEmailToClipboard = () => {
    if (!selectedAuction) return;

    const emailText = generateEmailTemplate();
    navigator.clipboard
      .writeText(emailText)
      .then(() => {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 3000); // Reset after 3 seconds
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        setError('Failed to copy email text. Please try again.');
      });
  };

  return (
    <div className="h-auto bg-gray-900 p-4 text-gray-100">
      <div className="mb-4 p-4">
        <a
          href="https://niemo.io"
          className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-600"
        >
          niemo.io
        </a>
      </div>
      <div className="w-full py-8">
        <header className="mb-6 text-center">
          <h1 className="mb-2 mb-8 text-3xl font-bold text-blue-300">
            Connecticut Foreclosure Data (Backend-Powered)
          </h1>

          <a
            href="https://sso.eservices.jud.ct.gov/foreclosures/Public/PendPostbyTownList.aspx"
            className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-600"
          >
            sso.eservices.jud.ct.gov
          </a>
        </header>

        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-300">
                Data fetched at: <span className="font-semibold">{timestamp}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchCityList}
                className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"
                disabled={fetchingCities}
              >
                Refresh City List
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-900 p-4 text-red-200">
            <h3 className="mb-1 font-semibold">Error</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Distance Filter */}
        <div className="mb-6 rounded-lg bg-gray-800 p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-300">Distance from Greenwich (mi):</label>
              <input
                aria-label="Distance from Greenwich"
                type="number"
                min="0"
                max="100"
                value={distanceFromGreenwich}
                onChange={(e) => setDistanceFromGreenwich(Number(e.target.value))}
                className="w-20 rounded border border-gray-600 bg-gray-700 p-2 text-white"
              />
            </div>
            <div>
              <span className="text-sm text-gray-400">
                ({selectedCities.length} cities selected)
              </span>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mb-6 rounded-lg bg-gray-800 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-gray-300">{getStatusMessage()}</p>

            {(fetchingPostings || fetchingDetails) && (
              <div className="mt-2 w-full">
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-full bg-blue-500 transition-all duration-200"
                    style={{
                      width: `${
                        fetchingPostings
                          ? (progress.citiesProcessed / progress.totalCities) * 100
                          : (progress.completed / progress.total) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Dashboard (when data is loaded) */}
        {!fetchingCities && !fetchingPostings && !fetchingDetails && postings.length > 0 && (
          <div className="mb-6 rounded-lg bg-gray-800 p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between">
              <h2 className="text-lg font-semibold text-blue-300">Foreclosure Data Summary</h2>

              <div className="group relative">
                <button
                  onClick={downloadTableAsCSV}
                  className="flex items-center rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"
                  disabled={
                    fetchingDetails || postings.filter((p) => p.status === 'loaded').length === 0
                  }
                  title="Download table data as CSV file"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  Download CSV
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {(() => {
                const stats = getStats();
                return (
                  <>
                    <div className="rounded bg-gray-700 p-4">
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-xl font-bold text-white">{stats.total}</p>
                    </div>
                    <div className="rounded bg-gray-700 p-4">
                      <p className="text-xs text-gray-500">Loaded</p>
                      <p className="text-xl font-bold text-green-400">{stats.loaded}</p>
                    </div>
                    <div className="rounded bg-gray-700 p-4">
                      <p className="text-xs text-gray-500">Pending</p>
                      <p className="text-xl font-bold text-gray-400">{stats.pending}</p>
                    </div>
                    <div className="rounded bg-gray-700 p-4">
                      <p className="text-xs text-gray-500">Errors</p>
                      <p className="text-xl font-bold text-red-400">{stats.error}</p>
                    </div>
                    <div className="rounded bg-gray-700 p-4">
                      <p className="text-xs text-gray-500">Cancelled Sales</p>
                      <p className="text-xl font-bold text-yellow-400">{stats.cancelled}</p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* City Selection Section */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-blue-300">
              Connecticut Cities with Foreclosure Data
            </h2>
            <p className="text-sm text-gray-400">
              {cityList.length} cities found - select cities and click "Process" to fetch
              foreclosure data
            </p>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={processSelectedCities}
              className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-500"
              disabled={
                fetchingCities || fetchingPostings || fetchingDetails || selectedCities.length === 0
              }
            >
              Process Selected Cities ({selectedCities.length})
            </button>
            <button
              onClick={() => setSelectedCities(cityList.map((city) => city.name))}
              className="rounded bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-600"
              disabled={
                fetchingCities || fetchingPostings || fetchingDetails || cityList.length === 0
              }
            >
              Select All Cities
            </button>
            <button
              onClick={() => setSelectedCities([])}
              className="rounded bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-600"
              disabled={
                fetchingCities || fetchingPostings || fetchingDetails || selectedCities.length === 0
              }
            >
              Clear Selection
            </button>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-700">
            <div className="bg-gray-800 p-3">
              <h3 className="font-medium text-white">Select Cities</h3>
            </div>

            <div className="bg-gray-800 p-4">
              {fetchingCities ? (
                <div className="flex justify-center py-8">
                  <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-400"></div>
                </div>
              ) : cityList.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-8">
                  {cityList.map((city, index) => (
                    <div
                      key={index}
                      onClick={() => toggleCitySelection(city.name)}
                      className={`cursor-pointer rounded-lg p-3 transition ${
                        selectedCities.includes(city.name)
                          ? 'bg-blue-700 hover:bg-blue-600'
                          : citiesByDistance.some(
                                (c) =>
                                  c.city === city.name && c.distanceMiles <= distanceFromGreenwich
                              )
                            ? 'bg-emerald-900/40 hover:bg-emerald-800/40'
                            : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <span
                        className={
                          selectedCities.includes(city.name)
                            ? 'text-blue-100'
                            : citiesByDistance.some(
                                  (c) =>
                                    c.city === city.name && c.distanceMiles <= distanceFromGreenwich
                                )
                              ? 'text-emerald-300'
                              : 'text-gray-100'
                        }
                      >
                        {city.name} ({city.count})
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400">
                  No cities found. Check backend connection.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Loading Indicator - Full Screen for major operations */}
        {(fetchingPostings || fetchingDetails) && (
          <div className="my-8 flex flex-col items-center justify-center">
            <div className="mb-4 h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-blue-400"></div>
            <p className="text-lg text-gray-300">
              {fetchingPostings ? 'Fetching posting IDs...' : 'Fetching auction details...'}
            </p>
          </div>
        )}

        {/* Results Table */}
        {!fetchingCities && !fetchingPostings && !fetchingDetails && postings.length > 0 && (
          <div className="mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-blue-300">Foreclosure Auction Notices</h2>
              <p className="text-sm text-gray-400">
                {postings.filter((p) => p.status === 'loaded').length} of {postings.length} details
                loaded
              </p>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      onClick={() => requestSort('status')}
                      className={`cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-150 ${
                        sortConfig.key === 'status'
                          ? 'bg-blue-800/20 text-blue-200 hover:bg-blue-800/30'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="group flex items-center">
                        <span>Status</span>
                        {getSortIndicator('status')}
                      </div>
                    </th>
                    <th
                      scope="col"
                      onClick={() => requestSort('city')}
                      className={`cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-150 ${
                        sortConfig.key === 'city'
                          ? 'bg-blue-800/20 text-blue-200 hover:bg-blue-800/30'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="group flex items-center">
                        <span>City</span>
                        {getSortIndicator('city')}
                      </div>
                    </th>
                    <th
                      scope="col"
                      onClick={() => requestSort('dollarAmountFound')}
                      className={`cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-150 ${
                        sortConfig.key === 'city'
                          ? 'bg-blue-800/20 text-blue-200 hover:bg-blue-800/30'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="group flex items-center">
                        <span>Deposit</span>
                        {getSortIndicator('dollarAmountFound')}
                      </div>
                    </th>

                    <th
                      scope="col"
                      onClick={() => requestSort('address')}
                      className={`cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-150 ${
                        sortConfig.key === 'city'
                          ? 'bg-blue-800/20 text-blue-200 hover:bg-blue-800/30'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="group flex items-center">
                        <span>Address</span>
                        {getSortIndicator('address')}
                      </div>
                    </th>

                    <th
                      scope="col"
                      onClick={() => requestSort('committeeName')}
                      className={`cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-150 ${
                        sortConfig.key === 'city'
                          ? 'bg-blue-800/20 text-blue-200 hover:bg-blue-800/30'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="group flex items-center">
                        <span>C. Name</span>
                        {getSortIndicator('companyName')}
                      </div>
                    </th>

                    <th
                      scope="col"
                      onClick={() => requestSort('committeePhone')}
                      className={`cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-150 ${
                        sortConfig.key === 'city'
                          ? 'bg-blue-800/20 text-blue-200 hover:bg-blue-800/30'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="group flex items-center">
                        <span>C. Phone</span>
                        {getSortIndicator('companyPhone')}
                      </div>
                    </th>

                    <th
                      scope="col"
                      onClick={() => requestSort('committeeEmail')}
                      className={`cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-150 ${
                        sortConfig.key === 'city'
                          ? 'bg-blue-800/20 text-blue-200 hover:bg-blue-800/30'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="group flex items-center">
                        <span>C. Email</span>
                        {getSortIndicator('companyEmail')}
                      </div>
                    </th>

                    <th
                      scope="col"
                      onClick={() => requestSort('saleDate')}
                      className={`cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-150 ${
                        sortConfig.key === 'saleDate'
                          ? 'bg-blue-800/20 text-blue-200 hover:bg-blue-800/30'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="group flex items-center">
                        <span>Sale</span>
                        {getSortIndicator('saleDate')}
                      </div>
                    </th>
                    <th
                      scope="col"
                      onClick={() => requestSort('docketNumber')}
                      className={`cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-150 ${
                        sortConfig.key === 'docketNumber'
                          ? 'bg-blue-800/20 text-blue-200 hover:bg-blue-800/30'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="group flex items-center">
                        <span>Docket Number</span>
                        {getSortIndicator('docketNumber')}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800">
                  {postings.length > 0 ? (
                    getSortedPostings().map((posting: any, index: number) => (
                      <tr key={`${posting.postingId}-${index}`} className="hover:bg-gray-700">
                        {/* Status */}
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                          {posting.status === 'loading' ? (
                            <span className="inline-flex items-center rounded-full border border-yellow-500 bg-yellow-900/30 px-2.5 py-0.5 text-xs font-medium text-yellow-300 shadow-sm">
                              <svg
                                className="mr-1 h-3 w-3 animate-spin text-yellow-400"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Loading...
                            </span>
                          ) : posting.status === 'loaded' ? (
                            posting.auctionNotice?.status?.toLowerCase().includes('cancel') ? (
                              <span className="inline-flex items-center rounded-full border border-orange-500 bg-orange-900/30 px-2.5 py-0.5 text-xs font-medium text-orange-300 shadow-sm">
                                <svg
                                  className="mr-1 h-3 w-3 text-orange-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                Cancelled
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full border border-green-500 bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-300 shadow-sm">
                                <svg
                                  className="mr-1 h-3 w-3 text-green-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                Active
                              </span>
                            )
                          ) : posting.status === 'error' ? (
                            <span className="inline-flex items-center rounded-full border border-red-500 bg-red-900/30 px-2.5 py-0.5 text-xs font-medium text-red-300 shadow-sm">
                              <svg
                                className="mr-1 h-3 w-3 text-red-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              Error
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full border border-blue-500 bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-300 shadow-sm">
                              <svg
                                className="mr-1 h-3 w-3 text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Pending
                            </span>
                          )}
                        </td>

                        {/* City */}
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                          {posting.auctionNotice?.town || posting.city || 'N/A'}
                        </td>

                        {/* Dollar Amount */}

                        <td className="px-6 py-4 text-sm text-gray-300">
                          {numberToDollarAmountString(
                            posting.auctionNotice?.dollarAmountNumber || 0
                          )}
                        </td>

                        {/* Address */}

                        <td className="px-6 py-4 text-sm text-gray-300">
                          {posting.auctionNotice?.address || 'N/A'}
                        </td>

                        {/* Committee Name */}
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {capitalizeEachWord(posting.auctionNotice?.committeeName || 'N/A')}
                        </td>

                        {/* Committee Phone */}

                        <td className="px-6 py-4 text-sm text-gray-300">
                          {findNumbersAndMakePhoneNumber(
                            posting.auctionNotice?.committeePhone || ''
                          ) || 'N/A'}
                        </td>
                        {/* Committee Email */}
                        <td className="px-6 py-4 text-sm lowercase text-gray-300">
                          <div className="flex items-center gap-2">
                            <span>{posting.auctionNotice?.committeeEmail || 'N/A'}</span>
                            {posting.auctionNotice?.committeeEmail && (
                              <button
                                onClick={() => {
                                  if (posting.auctionNotice) {
                                    // Open email compose modal with this auction's details
                                    setSelectedAuction(posting.auctionNotice);
                                    setIsEmailModalOpen(true);
                                  }
                                }}
                                className="rounded bg-blue-700 px-2 py-1 text-xs font-medium text-white transition hover:bg-blue-600"
                                title="Compose email about this property"
                              >
                                Email
                              </button>
                            )}
                          </div>
                        </td>

                        {/* Sale Date */}
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                          {posting.auctionNotice?.saleDate
                            ? formatSaleDate({
                                saleDate: posting.auctionNotice.saleDate,
                                saleTime: posting.auctionNotice.saleTime,
                                showTime: false,
                              })
                            : 'N/A'}
                        </td>

                        {/* Docket Number */}
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                          {posting.auctionNotice?.docketNumber || 'N/A'}
                        </td>

                        {/* Actions */}
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                          <a
                            href={`https://sso.eservices.jud.ct.gov/foreclosures/Public/PendPostDetailPublic.aspx?PostingId=${posting.postingId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-blue-400 hover:text-blue-300"
                          >
                            Link
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                        No data available yet. Select cities and click "Process Selected Cities".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Email Compose Modal */}
        {isEmailModalOpen && selectedAuction && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 p-4"
            onClick={() => {
              setIsEmailModalOpen(false);
              setEmailCopied(false);
            }}
          >
            <div
              className="relative mx-auto max-w-3xl rounded-lg bg-gray-800 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="rounded-t-lg border-b border-gray-700 bg-gray-900 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">
                    Email Template for {capitalizeEachWord(selectedAuction.address)}
                  </h3>
                  <button
                    onClick={() => {
                      setIsEmailModalOpen(false);
                      setEmailCopied(false);
                    }}
                    className="rounded-full bg-gray-800 p-1 text-gray-400 transition hover:bg-gray-700 hover:text-white"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-4">
                <div className="mb-4 flex justify-between rounded border border-gray-700 bg-gray-700 p-2">
                  <div>
                    <p className="text-xs text-gray-400">To: {selectedAuction.committeeEmail}</p>
                  </div>
                  <button
                    onClick={copyEmailToClipboard}
                    className={`flex items-center rounded px-3 py-1 text-xs font-medium ${
                      emailCopied
                        ? 'bg-green-700 text-white'
                        : 'bg-blue-700 text-white hover:bg-blue-600'
                    }`}
                  >
                    {emailCopied ? (
                      <>
                        <svg
                          className="mr-1 h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg
                          className="mr-1 h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        Copy Email
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 max-h-96 overflow-y-auto rounded border border-gray-700 bg-gray-900 p-4 font-mono text-sm text-gray-300">
                  <pre className="whitespace-pre-wrap">{generateEmailTemplate()}</pre>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    Click the "Copy Email" button to copy this template to your clipboard. Then
                    paste it into your email client to send.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="rounded-b-lg border-t border-gray-700 px-6 py-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setIsEmailModalOpen(false);
                      setEmailCopied(false);
                    }}
                    className="rounded bg-gray-700 px-4 py-2 font-medium text-white hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForeclosureNew;
