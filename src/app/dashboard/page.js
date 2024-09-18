import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import FeatureCard from '@/components/FeatureCard'
import EvaluateResumes from '@/components/EvaluateResumes'

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

    console.log(user)

    const features = [
        { title: 'Evaluate Resumes', description: 'Upload and analyze resumes', icon: '📄', active: true },
        { title: 'Create JD', description: 'Create job descriptions', icon: '✍️', comingSoon: true },
        { title: 'Automated Smart Interviews', description: 'Conduct AI-powered interviews', icon: '🤖', comingSoon: true },
        { title: 'Candidate Pipeline', description: 'Manage your recruitment pipeline', icon: '🔄', comingSoon: true },
        { title: 'Analytics & Reports', description: 'Get insights from your data', icon: '📊', comingSoon: true },
        { title: 'Integrations', description: 'Connect with other platforms', icon: '🔗', comingSoon: true },
    ]

    return (
        <DashboardLayout user={user}>
            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.full_name || session.user.email}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
                {/* <EvaluateResumes /> */}
            </div>
        </DashboardLayout>
    )
}
