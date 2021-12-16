import { Component, OnInit } from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import esLocale from "@fullcalendar/core/locales/es";
import frLocale from "@fullcalendar/core/locales/fr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  calendarOptions: CalendarOptions | undefined;
  currentEvents: EventApi[] = [];
  calendarVisible = true;
  eventId = 0;
  listEvents: Array<any> = [
    {
      id: this.createId(),
      title: 'All-day event',
      start: new Date().toISOString().replace(/T.*$/, '')
    },
    {
      id: this.createId(),
      title: 'Timed event',
      start: new Date().toISOString().replace(/T.*$/, '') + 'T12:00:00'
    }
  ]

  ngOnInit(): void {
    this.calendarOptions = {
      locales: [esLocale, frLocale],
      locale: 'es', // the initial locale. of not specified, uses the first one
      plugins: [interactionPlugin, listPlugin, resourceTimelinePlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth,resourceTimelineYear,listMonth'
      },
      views: {
        resourceTimelineWeek: {
          type: 'resourceTimelineDay',
          duration: { weeks: 1 },
          slotDuration: { days: 1 },
        },
        resourceTimelineMonth: {
          type: 'resourceTimelineWeek',
          duration: { months: 1 },
          slotDuration: { weeks: 1 },
        },
        resourceTimelineYear: {
          type: 'resourceTimelineMonth',
          duration: { years: 1 },
          slotDuration: { months: 1 },
          buttonText: 'Year',
        }
      },
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      aspectRatio: 1.5,
      resourceAreaHeaderContent: 'Rooms',
      resources: 'https://fullcalendar.io/demo-resources.json?with-nesting&with-colors',
      events: 'https://fullcalendar.io/demo-events.json?single-day&for-resource-timeline',
      initialView: 'resourceTimelineYear',
      initialEvents: this.listEvents, // alternatively, use the `events` setting to fetch from a feed
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this)
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event.');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  createId() {
    return String(this.eventId++);
  }
}