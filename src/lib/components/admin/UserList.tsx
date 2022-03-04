const Userlist = ({ users, onExport }: { users: { name: string; email: string; class: string }[]; onExport: () => void }) => {
    return (
        <div className='mt-5 px-5 md:px-10 py-5 rounded-lg border border-zinc-200 dark:border-zinc-700 dark:bg-back-highlight'>
            <div className='text-2xl mb-5'>Jelentkezők</div>
            <div>
                {!users.length ? (
                    <div className='text-center text-zinc-400'>Még senki sem jelentkezett erre a programra</div>
                ) : (
                    <table className='table-auto w-full'>
                        <thead className='border-b border-b-zinc-200 dark:border-b-zinc-600'>
                            <tr className='text-left'>
                                <th>Név</th>
                                <th>Email</th>
                                <th>Osztály</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((x, i) => {
                                return (
                                    <tr key={i} className={`${i % 2 ? 'bg-zinc-600' : ''}`}>
                                        <td className='p-1'>{x.name}</td>
                                        <td className='p-1'>{x.email}</td>
                                        <td className='p-1'>{x.class}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <div className='mt-5'>
                <button onClick={onExport} className='p-2 rounded-md bg-green-600 hover:bg-green-500 text-white'>
                    Exportálás mint CSV
                </button>
            </div>
        </div>
    );
};

export default Userlist;
