from django.urls import path

from .star_notes_views import StarNoteSearchView
from .views import ResumeAgentSessionView, ResumeAgentStatusView, ResumeKnowledgeSearchView


urlpatterns = [
    path("status/", ResumeAgentStatusView.as_view(), name="resume-agent-status"),
    path("session/", ResumeAgentSessionView.as_view(), name="resume-agent-session"),
    path("search/", ResumeKnowledgeSearchView.as_view(), name="resume-agent-search"),
    path("star-notes/search/", StarNoteSearchView.as_view(), name="star-note-search"),
]
