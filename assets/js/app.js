const { useState, useEffect, useRef } = React;
function Header() {
    const headerRef = useRef(null);
    useEffect(() => {
        if(headerRef.current) {
            const tw = new Typewriter(headerRef.current, { loop: false, delay: 75 });
            tw.typeString('GitHub Explorer').pauseFor(2500).start();
        }
    }, []);
    return (<header><h1 ref={headerRef} /></header>);
}
function TokenInput({ token, setToken }) {
    return (
        <div className="inputs">
            <input type="text" placeholder="Enter your GitHub Token..." value={token} onChange={e => setToken(e.target.value)} />
            <div className="token-info">
                <a href="https://github.com/settings/personal-access-tokens" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-info-circle"></i> How to get a token?
                </a>
            </div>
        </div>
    );
}
function SearchBox({ username, setUsername, onSearch }) {
    return (
        <div className="search-box">
            <input type="text" placeholder="Enter GitHub username..." value={username} onChange={e => setUsername(e.target.value)} />
            <button onClick={onSearch}>Search</button>
        </div>
    );
}
function CollapsibleSection({ title, icon, children, defaultCollapsed = false }) {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    return (
        <section>
            <div className="collapsible-header" onClick={() => setCollapsed(!collapsed)}>
                <h3><i className={icon}></i> {title}</h3>
                <i className={`fas fa-chevron-${collapsed ? 'down' : 'up'}`}></i>
            </div>
            {!collapsed && <div className="list">{children}</div>}
        </section>
    );
}
function UserInfoCard({ user }) {
    return (
        <section className="user-info-card">
            <img src={user.avatar_url} alt={user.login} crossOrigin="anonymous" />
            <div className="user-info-details">
                <h2>{user.name || user.login}</h2>
                {user.bio && <p style={{ fontStyle: 'italic' }}>{user.bio}</p>}
                <p><a href={user.html_url} target="_blank" rel="noreferrer">View Profile</a></p>
                <div className="stats">
                    <span><i className="fas fa-users"></i> {user.followers}</span>
                    <span><i className="fas fa-user-plus"></i> {user.following}</span>
                    <span><i className="fas fa-code"></i> {user.public_repos}</span>
                    <span><i className="fas fa-code-branch"></i> {user.public_gists}</span>
                </div>
            </div>
        </section>
    );
}
function ResultView({ data }) {
    const { user, followers, following, repos, orgs, gists, subscriptions, starred, events, receivedEvents } = data;
    return (
        <div className="result" id="captureArea">
            <UserInfoCard user={user} />
            <CollapsibleSection title={`Followers (${followers.length})`} icon="fas fa-users">
                {followers.length ? followers.map(f => (
                    <div className="list-item" key={f.id}>
                        <img src={f.avatar_url} alt={f.login} crossOrigin="anonymous" />
                        <a href={f.html_url} target="_blank" rel="noreferrer">{f.login}</a>
                    </div>
                )) : <p>No followers found</p>}
            </CollapsibleSection>
            <CollapsibleSection title={`Following (${following.length})`} icon="fas fa-user-plus">
                {following.length ? following.map(u => (
                    <div className="list-item" key={u.id}>
                        <img src={u.avatar_url} alt={u.login} crossOrigin="anonymous" />
                        <a href={u.html_url} target="_blank" rel="noreferrer">{u.login}</a>
                    </div>
                )) : <p>Not following anyone</p>}
            </CollapsibleSection>
            <CollapsibleSection title={`Repositories (${repos.length})`} icon="fas fa-book">
                {repos.length ? repos.map(r => (
                    <div className="list-item" key={r.id}>
                        <a href={r.html_url} target="_blank" rel="noreferrer">{r.name}</a>
                        <p>{r.description || ''}</p>
                        <div className="repo-stats">
                            <span><i className="fas fa-star"></i> {r.stargazers_count}</span>
                            <span><i className="fas fa-code-branch"></i> {r.forks_count}</span>
                        </div>
                    </div>
                )) : <p>No repositories found</p>}
            </CollapsibleSection>
            <CollapsibleSection title={`Organizations (${orgs.length})`} icon="fas fa-building">
                {orgs.length ? orgs.map(org => (
                    <div className="list-item" key={org.id}>
                        {org.avatar_url && <img src={org.avatar_url} alt={org.login} crossOrigin="anonymous" />}
                        <a href={`https://github.com/${org.login}`} target="_blank" rel="noreferrer">{org.login}</a>
                    </div>
                )) : <p>No organizations found</p>}
            </CollapsibleSection>
            <CollapsibleSection title={`Gists (${gists.length})`} icon="fas fa-file-code">
                {gists.length ? gists.map(g => (
                    <div className="list-item" key={g.id}>
                        <a href={g.html_url} target="_blank" rel="noreferrer">{g.id}</a>
                        <p>{g.description || ''}</p>
                    </div>
                )) : <p>No gists found</p>}
            </CollapsibleSection>
            <CollapsibleSection title={`Subscriptions (${subscriptions.length})`} icon="fas fa-bell">
                {subscriptions.length ? subscriptions.map(sub => (
                    <div className="list-item" key={sub.id}>
                        <a href={sub.html_url} target="_blank" rel="noreferrer">{sub.name}</a>
                        <p>{sub.description || ''}</p>
                    </div>
                )) : <p>No subscriptions found</p>}
            </CollapsibleSection>
            <CollapsibleSection title={`Starred Repos (${starred.length})`} icon="fas fa-star">
                {starred.length ? starred.map(s => (
                    <div className="list-item" key={s.id}>
                        <a href={s.html_url} target="_blank" rel="noreferrer">{s.name}</a>
                        <p>{s.description || ''}</p>
                    </div>
                )) : <p>No starred repos found</p>}
            </CollapsibleSection>
            <CollapsibleSection title={`Recent Events (${events.length})`} icon="fas fa-bolt">
                {events.length ? events.map(ev => (
                    <div className="list-item" key={ev.id}>
                        <p><strong>{ev.type}</strong></p>
                        <p>{ev.repo ? ev.repo.name : ''}</p>
                        <p>{new Date(ev.created_at).toLocaleDateString()}</p>
                    </div>
                )) : <p>No recent events found</p>}
            </CollapsibleSection>
            <CollapsibleSection title={`Received Events (${receivedEvents.length})`} icon="fas fa-envelope">
                {receivedEvents.length ? receivedEvents.map(re => (
                    <div className="list-item" key={re.id}>
                        <p><strong>{re.type}</strong></p>
                        <p>{re.repo ? re.repo.name : ''}</p>
                        <p>{new Date(re.created_at).toLocaleDateString()}</p>
                    </div>
                )) : <p>No received events found</p>}
            </CollapsibleSection>
        </div>
    );
}
function Footer() {
    return (<footer className="footer"><p>© {new Date().getFullYear()} GitHub Explorer | Built by polarxcised</p></footer>);
}
function App() {
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleSearch = async () => {
        if (!token) { alert('Please enter a GitHub Token first!'); return; }
        if (!username) { alert('Please enter a GitHub username!'); return; }
        setLoading(true);
        setError('');
        setData(null);
        try {
            const userRes = await fetch(`https://api.github.com/users/${username}`, { headers: { Authorization: `Bearer ${token}` } });
            if (!userRes.ok) throw new Error('User not found');
            const user = await userRes.json();
            const endpoints = {
                followers: user.followers_url,
                following: user.following_url.replace('{/other_user}', ''),
                repos: user.repos_url,
                orgs: user.organizations_url,
                gists: user.gists_url.replace('{/gist_id}', ''),
                subscriptions: user.subscriptions_url,
                starred: user.starred_url.replace('{/owner}{/repo}', ''),
                events: user.events_url.replace('{/privacy}', ''),
                receivedEvents: user.received_events_url
            };
            const [
                followers, following, repos, orgs, gists,
                subscriptions, starred, events, receivedEvents
            ] = await Promise.all([
                fetch(endpoints.followers, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
                fetch(endpoints.following, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
                fetch(endpoints.repos, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
                fetch(endpoints.orgs, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
                fetch(endpoints.gists, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
                fetch(endpoints.subscriptions, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
                fetch(endpoints.starred, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
                fetch(endpoints.events, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
                fetch(endpoints.receivedEvents, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json())
            ]);
            setData({ user, followers, following, repos, orgs, gists, subscriptions, starred, events, receivedEvents });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Header />
            <div className="container">
                <TokenInput token={token} setToken={setToken} />
                <SearchBox username={username} setUsername={setUsername} onSearch={handleSearch} />
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {data && <ResultView data={data} />}
            </div>
            <Footer />
        </>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
