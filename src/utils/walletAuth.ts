export const signInWithWallet = async (address: string) => {
  try {
    const formattedAddress = address.toLowerCase();
    console.log('Storing wallet session:', formattedAddress);

    // Store session in browser storage for 1 week
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    sessionStorage.setItem('wallet_session', JSON.stringify({
      address: formattedAddress,
      expiry: expiryDate.toISOString(),
    }));

    return { success: true };
  } catch (error) {
    console.error('Error during wallet authentication:', error);
    return { success: false, error };
  }
};