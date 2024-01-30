import { trpc } from '@/lib/trpc';
import { SignInButton } from '@clerk/clerk-react';

function Home() {
    const test = trpc.test.useQuery();

    return (
        <div>
            <SignInButton />
            {test.data?.message}
        </div>
    );
}

export default Home;
