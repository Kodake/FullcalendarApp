import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontEnd';
  calendarOptions: CalendarOptions | undefined

  listEvents: Array<any> = [
    { title: 'event 1', date: '2021-10-15' },
    { title: 'event 2', date: '2021-10-16' }
  ]

  ngOnInit(): void {
    this.calendarOptions = {
      timeZone: 'UTC',
      initialView: 'dayGridMonth',
      plugins: [interactionPlugin, listPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridDay,dayGridWeek,dayGridMonth,listWeek'
      },
      dateClick: this.handleDateClick.bind(this), // bind is important!
      editable: true,
      selectable: true,
      events: this.listEvents
      // events: 'https://fullcalendar.io/demo-events.json'
    };
  }

  updateEvents() {
    const event = {
      title: 'title x',
      date: '2021-10-02'
    }
    this.listEvents.push({ event });
  }

  handleDateClick(arg: { dateStr: string; }) {

    var dateStr = prompt('Enter a date in YYYY-MM-DD format');
    var date = new Date(dateStr + 'T00:00:00'); // will be in local time

    if (!isNaN(date.valueOf())) { // valid?
      const event = {
        title: 'event ' + this.listEvents.length,
        date: arg.dateStr
      }
      this.listEvents.push(event);
      console.log(this.listEvents);
      alert('Great. Now, update your database...');
    } else {
      alert('Invalid date.');
    }
    this.ngOnInit();
  }
}