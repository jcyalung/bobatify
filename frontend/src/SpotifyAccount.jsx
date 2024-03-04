// spotify account display

const SpotifyAccount = ({account}) => {
    if(account.display_name === undefined) return (<div className="account"><p></p><p></p><p></p></div>)
    return (
        <div className="account">
          <p>Hello, {account.display_name}!</p><img src={account.images[0]['url']} alt='profile' />
        </div>)
}

export default SpotifyAccount;