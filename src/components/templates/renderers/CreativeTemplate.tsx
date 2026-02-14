import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import { CV } from "@/types/cv";

Font.register({
    family: "Montserrat",
    fonts: [
        { src: "https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wlhyw.ttf" },
        { src: "https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wlhyw.ttf", fontWeight: "bold" },
    ],
});

const styles = StyleSheet.create({
    page: {
        fontFamily: "Montserrat",
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
    },
    sidebar: {
        width: "35%",
        backgroundColor: "#2D3748",
        padding: 20,
        color: "white",
        height: "100%",
    },
    main: {
        width: "65%",
        padding: 20,
        paddingTop: 40,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 5,
        color: "white",
    },
    jobTitle: {
        fontSize: 12,
        color: "#A0AEC0",
        marginBottom: 20,
    },
    sidebarSection: {
        marginBottom: 20,
    },
    sidebarTitle: {
        fontSize: 12,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderBottomColor: "#4A5568",
        paddingBottom: 5,
        marginBottom: 10,
        textTransform: "uppercase",
        color: "#CBD5E0",
    },
    sidebarText: {
        fontSize: 9,
        marginBottom: 5,
        color: "#E2E8F0",
    },
    mainSection: {
        marginBottom: 20,
    },
    mainTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#2D3748",
        textTransform: "uppercase",
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: "#2D3748",
        width: "100%",
    },
    expItem: {
        marginBottom: 15,
    },
    expHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
    },
    company: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#2D3748",
    },
    date: {
        fontSize: 9,
        color: "#718096",
    },
    position: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#4A5568",
        marginBottom: 2,
    },
    description: {
        fontSize: 9,
        color: "#4A5568",
        lineHeight: 1.5,
    },
    skillTag: {
        backgroundColor: "#4A5568",
        padding: "4 8",
        borderRadius: 4,
        fontSize: 8,
        marginBottom: 5,
        marginRight: 5,
        alignSelf: "flex-start",
    },
    skillsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    }
});

export const CreativeTemplatePDF = ({ cv }: { cv: CV }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.sidebar}>
                <Text style={styles.name}>{cv.data.personalInfo.fullName}</Text>
                <Text style={styles.jobTitle}>{cv.data.personalInfo.jobTitle}</Text>

                <View style={styles.sidebarSection}>
                    <Text style={styles.sidebarTitle}>Contact</Text>
                    <Text style={styles.sidebarText}>{cv.data.personalInfo.email}</Text>
                    <Text style={styles.sidebarText}>{cv.data.personalInfo.phone}</Text>
                    <Text style={styles.sidebarText}>{cv.data.personalInfo.location}</Text>
                    <Text style={styles.sidebarText}>{cv.data.personalInfo.website}</Text>
                </View>

                <View style={styles.sidebarSection}>
                    <Text style={styles.sidebarTitle}>Skills</Text>
                    <View style={styles.skillsContainer}>
                        {cv.data.skills.technical.map(skill => (
                            <Text key={skill} style={styles.skillTag}>{skill}</Text>
                        ))}
                    </View>
                </View>

                <View style={styles.sidebarSection}>
                    <Text style={styles.sidebarTitle}>Education</Text>
                    {cv.data.education.map(edu => (
                        <View key={edu.id} style={{ marginBottom: 10 }}>
                            <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'white' }}>{edu.institution}</Text>
                            <Text style={styles.sidebarText}>{edu.degree}</Text>
                            <Text style={{ fontSize: 8, color: '#A0AEC0' }}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.main}>
                {cv.data.personalInfo.summary && (
                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>Profile</Text>
                        <Text style={styles.description}>{cv.data.personalInfo.summary}</Text>
                    </View>
                )}

                <View style={styles.mainSection}>
                    <Text style={styles.mainTitle}>Experience</Text>
                    {cv.data.experience.map(exp => (
                        <View key={exp.id} style={styles.expItem}>
                            <View style={styles.expHeader}>
                                <Text style={styles.company}>{exp.company}</Text>
                                <Text style={styles.date}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
                            </View>
                            <Text style={styles.position}>{exp.position}</Text>
                            <Text style={styles.description}>{exp.description}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);
