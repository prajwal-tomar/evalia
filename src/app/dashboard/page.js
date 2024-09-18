import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import FeatureCard from '@/components/FeatureCard'
import EvaluateResumes from '@/components/EvaluateResumes'
import Link from 'next/link'

export default async function Dashboard() {
    const supabase = createServerComponentClient({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login')
    }

    const { data: user } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

    const features = [
        { title: 'Evaluate Resumes', description: 'Upload and analyze resumes', icon: '📄', active: true },
        { title: 'Create JD', description: 'Create job descriptions', icon: '✍️', comingSoon: true },
        { title: 'Automated Smart Interviews', description: 'Conduct AI-powered interviews', icon: '🤖', comingSoon: true },
        { title: 'Candidate Pipeline', description: 'Manage your recruitment pipeline', icon: '🔄', comingSoon: true },
        { title: 'Analytics & Reports', description: 'Get insights from your data', icon: '📊', comingSoon: true },
        { title: 'Integrations', description: 'Connect with other platforms', icon: '🔗', comingSoon: true },
    ]

    // Simulated data for personalization (replace with actual data in a real application)
    const lastEvaluatedResume = "Software Engineer"
    const activeResumes = 5

    return (
        <DashboardLayout user={user}>
            <div className="p-6 space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome back, {user?.full_name || session.user.email}!</h1>
                    <p className="text-gray-600">Here&apos;s a quick summary of your recent activity:</p>
                    <ul className="mt-2 text-sm text-gray-700">
                        <li>Last resume evaluated: <span className="font-semibold">{lastEvaluatedResume}</span></li>
                        <li>Active resumes: <span className="font-semibold">{activeResumes}</span></li>
                    </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature}>
                            {feature.active && (
                                <Link href="/evaluate-resumes" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                                    Start Now
                                </Link>
                            )}
                            {feature.comingSoon && (
                                <span className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                    Coming Soon
                                </span>
                            )}
                        </FeatureCard>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
